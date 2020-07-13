import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportLayoutComponent } from './report-layout.component';
import { ReportListComponent } from './report-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ReportRoutingModule
    ],
    declarations: [
        ReportLayoutComponent,
        ReportListComponent
    ]
})
export class ReportModule { }