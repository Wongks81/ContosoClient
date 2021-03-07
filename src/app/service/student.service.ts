import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Student } from "../students/students.model";
import * as _ from "lodash";


@Injectable({providedIn: 'root'})
export class StudentService{
    studentObj = new Student();
    constructor( private http:HttpClient, private router:Router){}

    addStudent(obj : Student)
    {
      //Add new Student the id is null
      return this.http.post("https://localhost:44348/api/StudentAPI", obj);
    }

    fetchStudents(){
        return this.http.get('https://localhost:44348/api/StudentAPI');
    }

    editStudent(){
        
    }

}