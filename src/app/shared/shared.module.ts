import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';
 import {MatTabsModule} from '@angular/material/tabs';

import { TitleComponent } from './title/title.component';
import { SearchComponent } from './search/search.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { SimpleModalComponent } from './modals/simple-modal/simple-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // DlDateTimePickerDateModule,
        MDBBootstrapModule.forRoot(),
        // BrowserAnimationsModule,
        // MatButtonModule,
        // MatCheckboxModule,
         MatTabsModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
     MatTabsModule,
    // DlDateTimePickerDateModule,
    TitleComponent,
    SearchComponent,
    SimpleModalComponent,
    ControlMessagesComponent,
  ],
  declarations: [
    TitleComponent,
    SearchComponent,
    SimpleModalComponent,
    ControlMessagesComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
})
export class SharedModule { }
