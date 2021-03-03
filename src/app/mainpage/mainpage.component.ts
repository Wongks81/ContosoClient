import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { statsCount } from "./mainpage.model";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  dbCount :statsCount[] =[]
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchCounts();
    
  }

  private fetchCounts(){
    this.http.get<{[key:string]:statsCount}>('https://localhost:44348/api/ContosoAPI')
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
      this.dbCount = respondData;
    });
  }

}
