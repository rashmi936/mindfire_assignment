import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class TransactionService {
     constructor(
       private http: HttpClient
    ) {
    }


    get() {
      return  this.http.get(environment.apiUrl+'transcation/')
    }


    create(data)
    {
        return this.http.post(environment.apiUrl+'transcation/',data)
    }

    removeAll()
    {
        return this.http.get(environment.apiUrl+'transcation/remove-all/')
    }

    reverseTranscation(id)
    {
        return this.http.get(environment.apiUrl+'transcation/reverse/'+id)
    }


}