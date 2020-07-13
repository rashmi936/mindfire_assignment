import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirportLayoutComponent } from './airport-layout.component';
import { AirportListComponent } from './airport-list.component';
import { AddEditAirportComponent } from './add-edit-airport.component';

const routes: Routes = [
    {
        path: '', component: AirportLayoutComponent,
        children: [
            { path: '', component: AirportListComponent },
            { path: 'add', component: AddEditAirportComponent },
            { path: 'edit/:id', component: AddEditAirportComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AirportRoutingModule { }