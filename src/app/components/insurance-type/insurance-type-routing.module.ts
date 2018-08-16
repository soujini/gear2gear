import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceTypeComponent} from './insurance-type.component';
import { InsuranceTypeListComponent} from './insurance-type-list/insurance-type-list.component';
import { InsuranceTypeFormComponent} from './insurance-type-form/insurance-type-form.component';

const insuranceTypeRoutes: Routes = [
  {
    path: 'insuranceType',
    component: InsuranceTypeComponent,
    children: [
        {path: 'list',component: InsuranceTypeListComponent},
        {path: 'add', component: InsuranceTypeFormComponent},
        {path: 'edit', component: InsuranceTypeFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(insuranceTypeRoutes)],
  exports: [RouterModule]
})
 export class InsuranceTypeRoutingModule { }
