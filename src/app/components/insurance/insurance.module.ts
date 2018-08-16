import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InsuranceRoutingModule,
  ],
  declarations: [
    InsuranceComponent,
    InsuranceListComponent,
    InsuranceFormComponent,
  ],
  // providers: [InsuranceService],
})
export class InsuranceModule { }
