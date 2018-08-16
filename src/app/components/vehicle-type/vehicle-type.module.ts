import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { VehicleTypeRoutingModule } from './vehicle-type-routing.module';
import { VehicleTypeComponent } from './vehicle-type.component';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeFormComponent } from './vehicle-type-form/vehicle-type-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VehicleTypeRoutingModule,
  ],
  declarations: [
    VehicleTypeComponent,
    VehicleTypeListComponent,
    VehicleTypeFormComponent,
  ],
  // providers: [VehicleTypeService],
})
export class VehicleTypeModule { }
