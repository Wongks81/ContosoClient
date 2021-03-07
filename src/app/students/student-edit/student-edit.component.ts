import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from "../../courses/courses.model";
import { map } from "rxjs/operators";
import { Student } from '../students.model';
import { Router } from '@angular/router';
import * as _ from "lodash";


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  courseList =[];
  studObj = new Student();
  constructor(public router:Router ,private http:HttpClient ) { 
        
    //state from .router.navigate
     if(this.router.getCurrentNavigation().extras.state.student != null){
       var std:any = this.router.getCurrentNavigation().extras.state.student;
       this.studObj = new Student();
       this.studObj.StudentId = std.studentId;
       this.studObj.StudentName = std.studentName;
       this.studObj.AdmissionDate = std.admissionDate;
       this.studObj.CourseId = std.courseId;
       this.studObj.Course = std.course;
       
    }
    
    

  }

  ngOnInit(): void {
    this.fetchCourses();
  }
  
  private fetchCourses(){
    //https://localhost:44348/ - new
    this.http.get<{[key:string]:Course}>('https://localhost:44348/Course/returnJSONCourses')
    .pipe(map(
      responseData =>{
        const countArray : any = [];
        for(const item in responseData){
          countArray.push({...responseData[item]});
        }
        return countArray;
      }
    ))
    .subscribe(respondData => {
      this.courseList = respondData;
    });
  }
  
  onSubmit(){
    var studentDTO : any = _.omit(this.studObj,['studentFGroup']);
    studentDTO = _.omit(studentDTO,['courseFGroup']);
    this.http.post("https://localhost:44348/api/StudentAPI", studentDTO)
    .subscribe(
      res=>this.Success(res),
      res=>this.Error(res));
    console.log(this.studObj);
    console.log("Submitted!");
  }

  // onSubmit(selected: Student){
  //   //prevent circular error, remove formGroup details from object
  //   //Brackets is the form group NAME that you have assigned
  //   if(selected == null){
  //       alert("none selected!!");
  //   }
    
  //   else{
  //     alert("selected!!");
  //   }
  //}

  




  Success(res){
    alert("Request Completed!");
  }
  Error(res){
    alert("Error" + res );
  }
}
