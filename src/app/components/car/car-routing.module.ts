import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent} from './car.component';
import { CarListComponent} from './car-list/car-list.component';
import { CarFormComponent} from './car-form/car-form.component';

const carRoutes: Routes = [
  {
    path: 'car',
    component: CarComponent,
    children: [
        {path: 'list',component: CarListComponent},
        {path: 'add', component: CarFormComponent},
        {path: 'edit', component: CarFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(carRoutes)],
  exports: [RouterModule]
})
 export class CarRoutingModule { }
