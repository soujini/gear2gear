import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,

  ],
  declarations: [
    ClientComponent,
    ClientListComponent,
    ClientFormComponent,
    TransactionDetailsComponent
  ],
  // providers: [ClientService],
})
export class ClientModule { }
