import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from "../../courses/courses.model";
import { map } from "rxjs/operators";
import { Student } from '../students.model';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { StudentService } from 'src/app/service/student.service';
import { CourseService } from 'src/app/service/course.service';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  courseList =[];
  studObj = new Student();
  editFlag :boolean = false;
  constructor(public router:Router ,
              private http:HttpClient,
              private studentService: StudentService,
              private courseService : CourseService  ) { 

    //state from .router.navigate
    if(this.router.getCurrentNavigation().extras.state.student != null){
      var std:any = this.router.getCurrentNavigation().extras.state.student;
      this.studObj = new Student();
      this.studObj.StudentId = std.studentId;
      this.studObj.StudentName = std.studentName;
      this.studObj.AdmissionDate = std.admissionDate;
      this.studObj.CourseId = std.courseId;
      this.studObj.Course = std.course;
      this.editFlag = true;
      
   }
   else{
     this.editFlag = false;
   }
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(){
    this.courseService.fetchCourses()
    .subscribe(response =>{
      this.courseList = response;
    })
  }
  
  onSubmit(){
    // var studentDTO : any = _.omit(this.studObj,['studentFGroup']);
    var studentDTO:any ={
      StudentId : this.studObj.StudentId,
      StudentName : this.studObj.StudentName,
      AdmissionDate : this.studObj.AdmissionDate,
      CourseId : this.studObj.Course.courseId,
      Course : this.studObj.Course
    };

    // this.studentService.addStudent(studentDTO)
    //  .subscribe(
    //    res=>this.Success(res),
    //    res=>this.Error(res));

    //this works
    //TO CONSIDER TO CREATE 2 SEPERATE COMPONENTS for ADD AND UPDATE
    this.studentService.updateCourse(this.studObj.StudentId,studentDTO)
     .subscribe(
       res=>this.Success(res),
       res=>this.Error(res));
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
