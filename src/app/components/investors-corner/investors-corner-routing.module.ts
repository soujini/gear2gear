import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorsCornerComponent} from './investors-corner.component';
import { AuthGuard } from 'app/auth.guard';

const investorsCornerRoutes: Routes = [
  {
    path: 'investors-corner',
    component: InvestorsCornerComponent,
    canActivate: [AuthGuard],
}];

@NgModule({
  imports: [RouterModule.forChild(investorsCornerRoutes)],
  exports: [RouterModule],
})

export class InvestorsCornerRoutingModule { }
