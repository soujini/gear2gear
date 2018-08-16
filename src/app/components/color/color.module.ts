import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ColorRoutingModule } from './color-routing.module';
import { ColorComponent } from './color.component';
import { ColorListComponent } from './color-list/color-list.component';
import { ColorFormComponent } from './color-form/color-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ColorRoutingModule,
  ],
  declarations: [
    ColorComponent,
    ColorListComponent,
    ColorFormComponent,
  ],
  // providers: [ColorService],
})
export class ColorModule { }
