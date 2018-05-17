import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MakeRoutingModule } from './make-routing.module';
import { MakeComponent } from './make.component';
import { MakeListComponent } from './make-list/make-list.component';
import { MakeFormComponent } from './make-form/make-form.component';
 // import { MakeService } from './services/make.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MakeRoutingModule,
  ],
  declarations: [
    MakeComponent,
    MakeListComponent,
    MakeFormComponent,
  ],
  // providers: [MakeService],
})
export class MakeModule { }
