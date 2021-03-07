import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StudentsComponent } from '../students/students.component';
import { MainpageComponent } from '../mainpage/mainpage.component';
import { CoursesComponent } from '../courses/courses.component';
import { AboutComponent } from "../about/about.component";

// A redirect route requires a pathMatch property to tell the router how to match a URL 
// to the path of a route. In this app, the router should select the route to the 
// HeroListComponent only when the entire URL matches '', so set the pathMatch value to 'full'.

const sidebarRoutes: Routes = [
  { path:'mainpage', component:MainpageComponent},
  { path:'students', component: StudentsComponent},
  { path:'courses', component: CoursesComponent},
  { path:'about', component: AboutComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      sidebarRoutes,
      //{enableTracing: true} //<--for debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class SidebarRoutingModule { }
