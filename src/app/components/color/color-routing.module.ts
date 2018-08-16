import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorComponent} from './color.component';
import { ColorListComponent} from './color-list/color-list.component';
import { ColorFormComponent} from './color-form/color-form.component';

const colorRoutes: Routes = [
  {
    path: 'color',
    component: ColorComponent,
    children: [
        {path: 'list',component: ColorListComponent},
        {path: 'add', component: ColorFormComponent},
        {path: 'edit', component: ColorFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(colorRoutes)],
  exports: [RouterModule]
})
 export class ColorRoutingModule { }
