import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent} from './insurance.component';
import { InsuranceListComponent} from './insurance-list/insurance-list.component';
import { InsuranceFormComponent} from './insurance-form/insurance-form.component';

const insuranceRoutes: Routes = [
  {
    path: 'insurance',
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
