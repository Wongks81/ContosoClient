import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Course } from "../courses/courses.model";



//provided in : add the current service to app module without declaring it there.
@Injectable({providedIn: 'root'})
export class CourseService{

    constructor( private http:HttpClient, private router:Router){}

    addCourse(obj : Course)
    {
       // if(this.courseObj.CourseId == null){
      //Add new Course the id is null
      return this.http.post("https://localhost:44348/api/CourseAPI", obj)
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

      getSelectedCourse(id){
        return this.http.get<{[key:string]:Course}>('https://localhost:44348/api/CourseAPI/' + id )
                  .pipe(map( res => {
                    const courseArr : any = [];
                    courseArr.push(res);
                    return courseArr;
                }));
      }

      updateCourse(id : number, obj : Course){
        return this.http.put('https://localhost:44348/api/CourseAPI/' + id , obj);
      }
}