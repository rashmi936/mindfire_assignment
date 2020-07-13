import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionLayoutComponent } from './transcation-layout.component';
import { TransactionListComponent } from './transcation-list.component';
import { AddEditTransactionComponent } from './add-edit-transcation.component';

const routes: Routes = [
    {
        path: '', component: TransactionLayoutComponent,
        children: [
            { path: '', component: TransactionListComponent },
            { path: 'add', component: AddEditTransactionComponent },
            { path: 'edit/:id', component: AddEditTransactionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }