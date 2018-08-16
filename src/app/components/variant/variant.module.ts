import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { VariantRoutingModule } from './variant-routing.module';
import { VariantComponent } from './variant.component';
import { VariantListComponent } from './variant-list/variant-list.component';
import { VariantFormComponent } from './variant-form/variant-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VariantRoutingModule,
  ],
  declarations: [
    VariantComponent,
    VariantListComponent,
    VariantFormComponent,
  ],
  // providers: [VariantService],
})
export class VariantModule { }
