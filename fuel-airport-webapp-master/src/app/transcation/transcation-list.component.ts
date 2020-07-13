import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TransactionService } from '@app/_services';

@Component({ templateUrl: 'transcation-list.component.html' })
export class TransactionListComponent implements OnInit {
    transcations = null;
    constructor(private transcationService: TransactionService) {}
    ngOnInit() {
        this.transcationService.get().subscribe((transcation: any) =>{
                this.transcations = transcation.data;
            } );
    }


    reverseTransction(id){
        this.transcationService.reverseTranscation(id).subscribe((transcation: any) =>{
            console.log("reverser")
        } );
    }
    
}