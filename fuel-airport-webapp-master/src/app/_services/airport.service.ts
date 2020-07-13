import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AirportService {
 
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }


    get() {
      return  this.http.get(environment.apiUrl+'airport/')
    }


    create(data)
    {
        return this.http.post(environment.apiUrl+'airport/',data)
    }

    

}