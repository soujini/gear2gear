import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent} from './insurance.component';
import { InsuranceListComponent} from './insurance-list/insurance-list.component';
import { InsuranceFormComponent} from './insurance-form/insurance-form.component';
import { AuthGuard } from 'app/auth.guard';

const insuranceRoutes: Routes = [
  {
    path: 'insurance',
    canActivate: [AuthGuard],
    component: InsuranceComponent,
    children: [
        {path: 'list',component: InsuranceListComponent},
        {path: 'add', component: InsuranceFormComponent},
        {path: 'edit', component: InsuranceFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(insuranceRoutes)],
  exports: [RouterModule]
})
 export class InsuranceRoutingModule { }
