import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorsCornerComponent} from './investors-corner.component';

const investorsCornerRoutes: Routes = [
  {
    path: 'investors-corner',
    component: InvestorsCornerComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(investorsCornerRoutes)],
  exports: [RouterModule],
})

export class InvestorsCornerRoutingModule { }
