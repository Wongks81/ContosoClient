import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from './courses.model';
import { Router } from '@angular/router';
import { CourseService } from "../service/course.service";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  coursesList =[];
  constructor(private http:HttpClient, 
              private router:Router,     //get current loaded route
              private courseService: CourseService,
              
              ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  editCourse(id){
    this.router.navigate(['/courses/course-edit', id]); 
  }

  loadCourses(){
    //get list of current courses
    this.courseService.fetchCourses()
    .subscribe(response =>{
      this.coursesList = response;
    })
  }

  deleteCourse(id:number, courseName : string){
    var reply = confirm("Remove " + courseName + " from Database?");
    if(reply == true){
      this.courseService.deleteCourse(id)
      .subscribe(
        res =>this.Success(res),
        res => this.Error(res)
    );     
    }
  }
  Success(res){
    alert("Request Completed!");
  }
  Error(res){
    alert("Error" );
  }
}
