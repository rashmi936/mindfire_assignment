
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AirportService } from '@app/_services';

@Component({ templateUrl: 'airport-list.component.html' })
export class AirportListComponent implements OnInit {
    airports = null;

    constructor(private airportService: AirportService) {}

    ngOnInit() {
        this.airportService.get()
            .subscribe((airports :any) => {
                console.log(airports)
                this.airports = airports.data});
    }

}