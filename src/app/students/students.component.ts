import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Student } from "./students.model";
import { Router } from '@angular/router';
import { StudentService } from "../service/student.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studList :any =[];
  constructor(private http:HttpClient,
              private studentService:StudentService,
              private router:Router,
             ) { }

  ngOnInit(): void {
    this.fetchStudent();
  }

  fetchStudent(){
    this.studentService.fetchStudents()
      .subscribe(
        res=>{
          this.studList = res;
        },
        res=>this.Error
      )
  }

  editStudent(selected:Student){
    this.router.navigate(['/students/student-edit'],
    {
      //pass the object to a variable call student as extra options
      state : {student:selected}
    });
  }

  deleteStudent(selected:Student){
    var reply = confirm("Remove " + selected.studentName + " from Database?");
    if(reply == true){
      this.studentService.deleteStudent(selected.studentId)
      .subscribe(
        res =>this.Success(res),
        res => this.Error(res)
    );     
    }
  }

  Success(res){
    this.ngOnInit();
  }
  Error(res){
    alert(res);
  }
}
