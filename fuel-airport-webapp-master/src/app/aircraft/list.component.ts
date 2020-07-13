import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AircraftService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    aircrafts = null;

    constructor(private aircraftService: AircraftService) {}

    ngOnInit() {
        this.aircraftService.get()
            .subscribe((aircrafts :any) => {
                console.log(aircrafts)
                this.aircrafts = aircrafts.data});
    }

}