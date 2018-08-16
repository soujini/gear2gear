import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { FuelType } from 'app/data-model';
import { FuelTypeService } from 'app/services/fuel-type/fuel-type.service';

@Component({
  selector: 'app-fuelType-form',
  templateUrl: './fuel-type-form.component.html',
  styleUrls: ['./fuel-type-form.component.scss']
})
export class FuelTypeFormComponent implements OnInit {
  title : string = "Create Fuel Type";
  module :string="fuel type";
  mode :string="discard";
  message:string="";
  fuelTypeForm: FormGroup;
  selectedFuelType_Id: any;
  submitted = false;

  constructor(private fb: FormBuilder, private fuelTypeService:FuelTypeService, private router:Router, private route:ActivatedRoute) {
  }


  createForm() {
    this.fuelTypeForm = this.fb.group({
      fuel_type_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.fuelTypeForm.valid) {
      if(this.fuelTypeService.selectedMode == 'Create'){
        this.createFuelType();
      }
      else if (this.fuelTypeService.selectedMode == 'Edit'){
        this.updateFuelType();
      }
    }
  }

  getFuelTypeById(fuelType_id:number){
    this.fuelTypeService.getFuelTypeById(fuelType_id)
    .subscribe(
        res => {
        this.fuelTypeForm.patchValue(res[0]);
        },
        err => {
          console.log(err);
        }
      );
  }

  createFuelType(){
    this.fuelTypeService.createFuelType(this.fuelTypeForm.value)
    .subscribe(
      res => {
        this.fuelTypeService.refreshList.next(true);
        this.fuelTypeForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateFuelType(){
    this.fuelTypeService.updateFuelType(this.fuelTypeForm.value)
    .subscribe(
      res => {
          this.fuelTypeService.refreshList.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteFuelType(event){
    if(this.selectedFuelType_Id)
    {
      this.fuelTypeService.deleteFuelType(this.selectedFuelType_Id).subscribe(
        res => {
          this.fuelTypeService.refreshList.next(true);
          this.router.navigate(['/fuelType/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.fuelTypeForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();

    this.fuelTypeService.selectedFuelTypeId
    .subscribe(
      res => {
        this.selectedFuelType_Id = res;
        if(this.fuelTypeService.selectedMode == "Edit"){
          this.title = "Edit Fuel Type";
          this.mode = "delete";
          this.getFuelTypeById(res);
        }
      },
      err => {

      }
    );
  }

}
