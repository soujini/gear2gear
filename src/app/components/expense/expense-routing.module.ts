import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseComponent} from './expense.component';
import { ExpenseListComponent} from './expense-list/expense-list.component';
import { ExpenseFormComponent} from './expense-form/expense-form.component';

const expenseRoutes: Routes = [
  {
    path: 'expense',
    component: ExpenseComponent,
    children: [
        {path: 'list',component: ExpenseListComponent},
        {path: 'add', component: ExpenseFormComponent},
        {path: 'edit', component: ExpenseFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(expenseRoutes)],
  exports: [RouterModule]
})
 export class ExpenseRoutingModule { }
