import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AirportRoutingModule } from './airport-routing.module';
import { AirportLayoutComponent } from './airport-layout.component';
import { AirportListComponent } from './airport-list.component';
import { AddEditAirportComponent } from './add-edit-airport.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AirportRoutingModule
    ],
    declarations: [
        AirportLayoutComponent,
        AirportListComponent,
        AddEditAirportComponent
    ]
})
export class AirportModule { }