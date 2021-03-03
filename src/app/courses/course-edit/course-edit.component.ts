import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../courses.model';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from "../../service/course.service";
import * as _ from "lodash";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseObj : Course = new Course();
  id:number =0 ;
  constructor(private http:HttpClient, 
              private route:ActivatedRoute,
              private courseService : CourseService) { }

  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get('id'))){
      this.courseObj.CourseId = Number(this.route.snapshot.paramMap.get('id'));
      this.courseObj.CourseName = this.route.snapshot.paramMap.get('CN');
    }
  }

  onSubmit(){
    //prevent circular error, remove formGroup details from object
    //Brackets is the form group NAME that you have assigned
    var courseDTO : any = _.omit(this.courseObj,['courseFGroup'])

    this.courseService.addCourse(courseDTO)
        .subscribe(resData =>{
          console.log(resData);
        })
    // if(this.courseObj.CourseId == null){
      //Add new Course the id is null
      // this.http.post("https://localhost:44348/api/CourseAPI", this.courseObj)
      // .subscribe(
      // res=>this.Success(res),
      // res=>this.Error(res));
    //}
    // else{
    //   //Current Course the id is passed to 
    //   this.http.put<Course>("https://localhost:44348/api/CourseAPI/" + this.courseObj.CourseId, this.courseObj)
    //   .subscribe(
    //   res=>this.Success(res),
    //   res=>this.Error(res));
    // }
  
  }
  Success(res){
    alert("Request Completed!");
  }
  Error(res){
    alert("Error" );
  }
}
