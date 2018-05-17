import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TitleComponent } from './title/title.component';
import { SearchComponent } from './search/search.component';

import { SimpleModalComponent } from './modals/simple-modal/simple-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TitleComponent,
    SearchComponent,
    SimpleModalComponent
  ],
  declarations: [
    TitleComponent,
    SearchComponent,
    SimpleModalComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
})
export class SharedModule { }
