import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { FuelTypeRoutingModule } from './fuel-type-routing.module';
import { FuelTypeComponent } from './fuel-type.component';
import { FuelTypeListComponent } from './fuel-type-list/fuel-type-list.component';
import { FuelTypeFormComponent } from './fuel-type-form/fuel-type-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FuelTypeRoutingModule,
  ],
  declarations: [
    FuelTypeComponent,
    FuelTypeListComponent,
    FuelTypeFormComponent,
  ],
  // providers: [FuelTypeService],
})
export class FuelTypeModule { }
