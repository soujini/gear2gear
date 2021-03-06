import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelComponent} from './model.component';
import { ModelListComponent} from './model-list/model-list.component';
import { ModelFormComponent} from './model-form/model-form.component';
import { AuthGuard } from 'app/auth.guard';

const modelRoutes: Routes = [
  {
    path: 'model',
    canActivate: [AuthGuard],
    component: ModelComponent,
    children: [
        {path: 'list',component: ModelListComponent},
        {path: 'add', component: ModelFormComponent},
        {path: 'edit', component: ModelFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(modelRoutes)],
  exports: [RouterModule]
})
 export class ModelRoutingModule { }
