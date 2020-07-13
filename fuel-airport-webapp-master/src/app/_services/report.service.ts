﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class ReportService {
     constructor(
       private http: HttpClient
    ) {
    }


    airport() {
      return  this.http.get(environment.apiUrl+'report/airport')
    }


    fuel()
    {
        return this.http.get(environment.apiUrl+'report/fuel')
    }


}