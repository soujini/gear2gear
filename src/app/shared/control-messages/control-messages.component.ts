import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from 'app/services/validation/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
    @Input() control: FormControl;
    constructor() { }

      ngOnInit(){}

    get errorMessage() {
      for (let propertyName in this.control.errors) {
          //if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        if (this.control.errors.hasOwnProperty(propertyName)) {
          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
      return null;
    }
  }
