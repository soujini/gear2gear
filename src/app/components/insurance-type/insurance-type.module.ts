import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { InsuranceTypeRoutingModule } from './insurance-type-routing.module';
import { InsuranceTypeComponent } from './insurance-type.component';
import { InsuranceTypeListComponent } from './insurance-type-list/insurance-type-list.component';
import { InsuranceTypeFormComponent } from './insurance-type-form/insurance-type-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InsuranceTypeRoutingModule,
  ],
  declarations: [
    InsuranceTypeComponent,
    InsuranceTypeListComponent,
    InsuranceTypeFormComponent,
  ],
  // providers: [InsuranceTypeService],
})
export class InsuranceTypeModule { }
