import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CarRoutingModule,
  ],
  declarations: [
    CarComponent,
    CarListComponent,
    CarFormComponent,
    TransactionDetailsComponent
  ],
  // providers: [CarService],
})
export class CarModule { }
