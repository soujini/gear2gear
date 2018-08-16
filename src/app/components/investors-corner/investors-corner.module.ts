import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InvestorsCornerRoutingModule } from './investors-corner-routing.module';
import { InvestorsCornerComponent } from './investors-corner.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvestorsCornerRoutingModule
    // BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatTabsModule
  ],
  declarations: [
     InvestorsCornerComponent
  ],
  // providers: [InsuranceService],
})
export class InvestorsCornerModule { }
