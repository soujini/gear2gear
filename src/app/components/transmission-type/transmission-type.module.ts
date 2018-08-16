import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { TransmissionTypeRoutingModule } from './transmission-type-routing.module';
import { TransmissionTypeComponent } from './transmission-type.component';
import { TransmissionTypeListComponent } from './transmission-type-list/transmission-type-list.component';
import { TransmissionTypeFormComponent } from './transmission-type-form/transmission-type-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransmissionTypeRoutingModule,
  ],
  declarations: [
    TransmissionTypeComponent,
    TransmissionTypeListComponent,
    TransmissionTypeFormComponent,
  ],
  // providers: [TransmissionTypeService],
})
export class TransmissionTypeModule { }
