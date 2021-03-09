import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { StudentService } from 'src/app/service/student.service';
import { Student } from '../students.model';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  courseList =[];
  studObj = new Student();
  editFlag :boolean = false;
  
  constructor(public router:Router ,
              private http:HttpClient,
              private studentService: StudentService,
              private courseService : CourseService  ) {}
  
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

    this.studentService.addStudent(studentDTO)
     .subscribe(
       res=>this.Success(res),
       res=>this.Error(res));

  }

  Success(res){
    alert("Request Completed!");
  }
  Error(res){
    alert("Error" + res );
  }
}
