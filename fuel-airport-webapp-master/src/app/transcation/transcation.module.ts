import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transcation-routing.module';
import { TransactionLayoutComponent } from './transcation-layout.component';
import { TransactionListComponent } from './transcation-list.component';
import { AddEditTransactionComponent } from './add-edit-transcation.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TransactionRoutingModule
    ],
    declarations: [
        TransactionLayoutComponent,
        TransactionListComponent,
        AddEditTransactionComponent
    ]
})
export class TransactionModule { }