import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelTypeComponent} from './fuel-type.component';
import { FuelTypeListComponent} from './fuel-type-list/fuel-type-list.component';
import { FuelTypeFormComponent} from './fuel-type-form/fuel-type-form.component';
import { AuthGuard } from 'app/auth.guard';

const fuelTypeRoutes: Routes = [
  {
    path: 'fuelType',
    canActivate: [AuthGuard],
    component: FuelTypeComponent,
    children: [
        {path: 'list',component: FuelTypeListComponent},
        {path: 'add', component: FuelTypeFormComponent},
        {path: 'edit', component: FuelTypeFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(fuelTypeRoutes)],
  exports: [RouterModule]
})
 export class FuelTypeRoutingModule { }
