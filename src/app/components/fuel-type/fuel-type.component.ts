import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-fuel-type',
  templateUrl: './fuel-type.component.html',
  styleUrls: ['./fuel-type.component.scss']
})
export class FuelTypeComponent implements OnInit {
  fuelTypeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.fuelTypeForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }


  ngOnInit() {
  }

}
