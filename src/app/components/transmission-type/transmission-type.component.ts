import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transmission-type',
  templateUrl: './transmission-type.component.html',
  styleUrls: ['./transmission-type.component.scss']
})
export class TransmissionTypeComponent implements OnInit {
  transmissionTypeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.transmissionTypeForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }

}
