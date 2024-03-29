import { Student } from "../students/students.model";
import { NgForm,FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";

export class Course{
    courseId: number;
    courseName: string;
    //1 Course can have alot of students
    students: Array<Student> = new Array<Student>();

    courseFGroup : FormGroup;

    constructor(){
        this.courseFGroup = new FormBuilder().group({});
        this.courseFGroup.addControl("cCourseName", new FormControl('', Validators.required));
    }
}