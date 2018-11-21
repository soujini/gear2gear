import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleTypeComponent} from './vehicle-type.component';
import { VehicleTypeListComponent} from './vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeFormComponent} from './vehicle-type-form/vehicle-type-form.component';
import { AuthGuard } from 'app/auth.guard';

const vehicleTypeRoutes: Routes = [
  {
    path: 'vehicleType',
    canActivate: [AuthGuard],
    component: VehicleTypeComponent,
    children: [
        {path: 'list',component: VehicleTypeListComponent},
        {path: 'add', component: VehicleTypeFormComponent},
        {path: 'edit', component: VehicleTypeFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(vehicleTypeRoutes)],
  exports: [RouterModule]
})
 export class VehicleTypeRoutingModule { }
