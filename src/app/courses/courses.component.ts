import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
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
              private courseService: CourseService
              ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  editCourse(id){
    this.router.navigate(['/courses/course-edit', id]);
  }

  loadCourses(){
    this.courseService.fetchCourses()
    .subscribe(response =>{
      this.coursesList = response;
    })
  }
}
