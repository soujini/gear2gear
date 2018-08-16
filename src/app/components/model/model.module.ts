import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './model.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelFormComponent } from './model-form/model-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModelRoutingModule,
  ],
  declarations: [
    ModelComponent,
    ModelListComponent,
    ModelFormComponent,
  ],
  // providers: [ModelService],
})
export class ModelModule { }
