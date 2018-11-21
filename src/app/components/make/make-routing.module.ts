import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeComponent} from './make.component';
import { MakeListComponent} from './make-list/make-list.component';
import { MakeFormComponent} from './make-form/make-form.component';
import { AuthGuard } from 'app/auth.guard';

const makeRoutes: Routes = [
  {
    path: 'make',
    canActivate: [AuthGuard],
    component: MakeComponent,
    children: [
        {path: 'list',component: MakeListComponent},
        {path: 'add', component: MakeFormComponent},
        {path: 'edit', component: MakeFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(makeRoutes)],
  exports: [RouterModule]
})
 export class MakeRoutingModule { }
