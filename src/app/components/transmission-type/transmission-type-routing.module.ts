import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransmissionTypeComponent} from './transmission-type.component';
import { TransmissionTypeListComponent} from './transmission-type-list/transmission-type-list.component';
import { TransmissionTypeFormComponent} from './transmission-type-form/transmission-type-form.component';
import { AuthGuard } from 'app/auth.guard';

const transmissionTypeRoutes: Routes = [
  {
    path: 'transmissionType',
    canActivate: [AuthGuard],
    component: TransmissionTypeComponent,
    children: [
        {path: 'list',component: TransmissionTypeListComponent},
        {path: 'add', component: TransmissionTypeFormComponent},
        {path: 'edit', component: TransmissionTypeFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(transmissionTypeRoutes)],
  exports: [RouterModule]
})
 export class TransmissionTypeRoutingModule { }
