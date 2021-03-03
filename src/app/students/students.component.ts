import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Student } from "./students.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studList =[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchStudent();
  }

  private fetchStudent(){
    this.http.get<Student[]>('https://localhost:44348/api/StudentAPI')
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
      this.studList = respondData;
      console.log(this.studList);
    });
  }
 

}
