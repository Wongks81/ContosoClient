import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from "../../courses/courses.model";
import { map } from "rxjs/operators";
import { Student } from '../students.model';
import { Router } from '@angular/router';
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
      this.studObj.studentId = std.studentId;
      this.studObj.studentName = std.studentName;
      this.studObj.admissionDate = std.admissionDate;
      this.studObj.courseId = std.courseId;
      this.studObj.course = std.course;
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
    var studentDTO:any ={
      StudentId : this.studObj.studentId,
      StudentName : this.studObj.studentName,
      AdmissionDate : this.studObj.admissionDate,
      CourseId : this.studObj.course.courseId,
      Course : this.studObj.course
    };

    this.studentService.updateStudent(this.studObj.studentId,studentDTO)
     .subscribe(
       res=>this.Success(res),
       res=>this.Error(res));
  }

  
  Success(res){
    this.router.navigateByUrl('/students');
    alert("Request Completed!");
  }
  Error(res){
    alert("Error" + res );
  }
}
