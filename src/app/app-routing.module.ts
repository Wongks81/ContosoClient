import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StudentsComponent } from './students/students.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { AboutComponent } from "./about/about.component";
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { StudentAddComponent } from './students/student-add/student-add.component';

// A redirect route requires a pathMatch property to tell the router how to match a URL 
// to the path of a route. In this app, the router should select the route to the 
// HeroListComponent only when the entire URL matches '', so set the pathMatch value to 'full'.

const appRoutes: Routes = [
  { path:'', component:MainpageComponent},
  { path:'about', component: AboutComponent},

  //student section
  { path:'students', component:StudentsComponent},
  { path:'students/student-edit', component:StudentEditComponent},
  { path:'students/student-add', component:StudentAddComponent},

  //course section
  { path:'courses', component:CoursesComponent},
  { path:'courses/course-edit', component:CourseEditComponent},
  { path:'courses/course-edit/:id', component:CourseEditComponent},

  
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
     // {enableTracing: true} //<--for debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
