import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance-type',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.scss']
})
export class InsuranceTypeComponent implements OnInit {
  insuranceTypeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.insuranceTypeForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }


  ngOnInit() {
  }

}
