import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const aircraftModule = () => import('./aircraft/aircraft.module').then(x => x.AircraftModule);
const airportModule = () => import('./airport/airport.module').then(x => x.AirportModule);
const transactionModule = () => import('./transcation/transcation.module').then(x => x.TransactionModule);
const reportModule = () => import('./report/report.module').then(x => x.ReportModule);



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'aircraft', loadChildren: aircraftModule, canActivate: [AuthGuard] },
    { path: 'airport', loadChildren: airportModule, canActivate: [AuthGuard] },
    { path: 'transcation', loadChildren: transactionModule, canActivate: [AuthGuard] },
    { path: 'report', loadChildren: reportModule, canActivate: [AuthGuard] },


    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }