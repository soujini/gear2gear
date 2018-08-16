import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExpenseRoutingModule,
  ],
  declarations: [
    ExpenseComponent,
    ExpenseListComponent,
    ExpenseFormComponent,
  ],
  // providers: [ExpenseService],
})
export class ExpenseModule { }
