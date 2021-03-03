import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from "../../courses/courses.model";
import { map } from "rxjs/operators";
import { Student } from '../students.model';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  courseList =[];
  studObj = new Student();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchCourses();
  }
  
  private fetchCourses(){
    //https://localhost:44348/ - new
    //https://localhost:44344 - old
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
      console.log(this.courseList);
    });
  }
  
  onSubmit(){
    console.log(this.studObj);
    this.http.post("https://localhost:44348/api/StudentAPI", this.studObj)
    .subscribe(
      res=>this.Success(res),
      res=>this.Error(res));
    console.log(this.studObj);
    console.log("Submitted!");
  }
  Success(res){
    alert("Request Completed!");
  }
  Error(res){
    alert("Error" + res );
  }
}
