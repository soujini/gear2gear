import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent} from './client.component';
import { ClientListComponent} from './client-list/client-list.component';
import { ClientFormComponent} from './client-form/client-form.component';

const clientRoutes: Routes = [
  {
    path: 'client',
    component: ClientComponent,
    children: [
        {path: 'list',component: ClientListComponent},
        {path: 'add', component: ClientFormComponent},
        {path: 'edit', component: ClientFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
 export class ClientRoutingModule { }
