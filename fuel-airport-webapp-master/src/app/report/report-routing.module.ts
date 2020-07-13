import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportLayoutComponent } from './report-layout.component';
import { ReportListComponent } from './report-list.component';

const routes: Routes = [
    {
        path: '', component: ReportLayoutComponent,
        children: [
            { path: '', component: ReportListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }