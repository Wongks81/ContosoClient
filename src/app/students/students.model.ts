import { Course } from "../courses/courses.model";
import { NgForm,FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";

export class Student{
    StudentId : number;
    StudentName : string;
    AdmissionDate : Date;
    CourseId : number;
    //1 student -> 1 course
    Course : Course = new Course();

    studentFGroup : FormGroup;

    constructor(){
        this.studentFGroup = new FormBuilder().group({});

        var vStudentName =[];
        vStudentName.push(Validators.required);
        vStudentName.push(Validators.pattern("^[a-zA-Z]{3,10}$"));
        this.studentFGroup.addControl("cStudentName", new FormControl('', Validators.compose(vStudentName)));
        //this.studentFGroup.addControl("ddCourseName", new FormControl(Student));
    }
}