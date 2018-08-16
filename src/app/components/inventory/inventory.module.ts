import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { InventoryComponent } from './inventory.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatTabsModule
  ],
  declarations: [
    InventoryComponent,
  ],
  // providers: [InsuranceService],
})
export class InventoryModule { }
