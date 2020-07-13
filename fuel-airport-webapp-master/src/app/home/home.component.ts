import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService, AirportService, AircraftService } from '@app/_services';

import { TransactionService, AlertService } from '@app/_services';
import { airport,aircraft} from '../dummy/airport';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService,
        private transctionService: TransactionService,
        private alertService: AlertService,
        private airportService: AirportService,
        private aircraftService: AircraftService,



        ) {
        this.user = this.accountService.userValue;

    }




    createAirportDummy() {
        airport.map(x=>{
            this.airportService.create(x).subscribe(()=>{})
        })

        
    }



    createAircraftDummy() {
    aircraft.map(x=>{
        this.aircraftService.create(x).subscribe(()=>{})
    })
}



    removeAllTransaction(){
        this.transctionService.removeAll().subscribe(()=>{
            this.alertService.success('Clear All Transcation successfully', { keepAfterRouteChange: true });
        })
    }
}