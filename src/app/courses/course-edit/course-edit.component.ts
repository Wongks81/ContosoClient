import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../courses.model';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from "../../service/course.service";
import * as _ from "lodash";
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseObj : Course = new Course();
  courseData=[];
  id:number = 0 ;
  constructor(private http:HttpClient, 
              private route:ActivatedRoute,
              private courseService : CourseService) { 
               this.id = Number(this.route.snapshot.paramMap.get('id')) ? 
                          Number(this.route.snapshot.paramMap.get('id')) : 0;
              }

  ngOnInit(): void {
    
    if(this.id != 0){
      this.courseService.getSelectedCourse(this.route.snapshot.paramMap.get('id'))
          .subscribe(respondData => {
          this.courseData= respondData[0];    //get the 1st or only record from the response
          this.courseObj.courseFGroup.controls.cCourseName.setValue(this.courseData['courseName']);
      });
    }
  }

  

  onSubmit(){
    //prevent circular error, remove formGroup details from object
    //Brackets is the form group NAME that you have assigned
    var courseDTO : any = _.omit(this.courseObj,['courseFGroup'])

    if(this.id != 0){
      //Edit section
      this.courseService.updateCourse(this.id, courseDTO)
        .subscribe(
          res =>this.Success(res),
          res => this.Error(res)
      );
    }
    else
    {
      //Add section
      this.courseService.addCourse(courseDTO)
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
