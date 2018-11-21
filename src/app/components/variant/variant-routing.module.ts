import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariantComponent} from './variant.component';
import { VariantListComponent} from './variant-list/variant-list.component';
import { VariantFormComponent} from './variant-form/variant-form.component';
import { AuthGuard } from 'app/auth.guard';

const variantRoutes: Routes = [
  {
    path: 'variant',
    canActivate: [AuthGuard],
    component: VariantComponent,
    children: [
        {path: 'list',component: VariantListComponent},
        {path: 'add', component: VariantFormComponent},
        {path: 'edit', component: VariantFormComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(variantRoutes)],
  exports: [RouterModule]
})
 export class VariantRoutingModule { }
