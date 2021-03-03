import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Course } from "../courses/courses.model";



//provided in : add the current service to app module without declaring it there.
@Injectable({providedIn: 'root'})
export class CourseService{

    constructor( private http:HttpClient){}
    coursesList=[];
    courseData :Course = new Course();

    addCourse(courseObj : Course)
    {
       // if(this.courseObj.CourseId == null){
      //Add new Course the id is null
      return this.http.post("https://localhost:44348/api/CourseAPI", courseObj)
    }
    fetchCourses(){
        
        return this.http.get<{[key:string]:Course}>('https://localhost:44348/api/CourseAPI')
        .pipe(map(
          responseData =>{
            const countArray : any = [];
            for(const item in responseData){
              countArray.push({...responseData[item]});
            }
            return countArray;
          }
        ))
      }

     
}