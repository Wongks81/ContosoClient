import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from "./app-routing.module";
import { SidebarRoutingModule } from "./sidebar/sidebar-routing.module";

import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { Student } from './students/students.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { StudentAddComponent } from './students/student-add/student-add.component';






@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    SidebarComponent,
    StudentsComponent,
    CoursesComponent,
    StudentEditComponent,
    AboutComponent,
    CourseEditComponent,
    StudentAddComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SidebarRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
    
  ],
  providers: [
              {provide: MAT_DATE_LOCALE, useValue: 'en-SG'},
            ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
