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
              private courseService : CourseService,
               ) {}
  
  ngOnInit(): void {
    this.fetchCourses();
  }

  getDefaultDate(){
    let d = new Date();
    d.setDate(d.getDate());
    return d
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
      StudentId : this.studObj.studentId,
      StudentName : this.studObj.studentName,
      AdmissionDate : this.studObj.admissionDate,
      CourseId : this.studObj.course.courseId,
      Course : this.studObj.course
    };

    this.studentService.addStudent(studentDTO)
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
