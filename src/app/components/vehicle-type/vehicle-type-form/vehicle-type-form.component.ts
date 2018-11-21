import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { VehicleType } from 'app/data-model';
import { VehicleTypeService } from 'app/services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-vehicleType-form',
  templateUrl: './vehicle-type-form.component.html',
  styleUrls: ['./vehicle-type-form.component.scss']
})
export class VehicleTypeFormComponent implements OnInit {
  title : string = "Create Vehicle Type";
  module :string="vehicle type";
  mode :string="discard";
  message:string="";
  message_error:string="";
  vehicleTypeForm: FormGroup;
  selectedVehicleType_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder, private vehicleTypeService:VehicleTypeService, private router:Router, private route:ActivatedRoute) {
    this.sub=this.vehicleTypeService.selectedVehicleTypeId
    .subscribe(
      res => {
        this.selectedVehicleType_Id = res;
        if(this.vehicleTypeService.selectedMode == "Edit"){
          this.title = "Edit Vehicle Type";
          this.mode = "delete";
          this.getVehicleTypeById(res);
        }
      },
      err => {

      }
    );
  }


  createForm() {
    this.vehicleTypeForm = this.fb.group({
      vehicle_type_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.vehicleTypeForm.valid) {
      if(this.vehicleTypeService.selectedMode == 'Create'){
        this.createVehicleType();
      }
      else if (this.vehicleTypeService.selectedMode == 'Edit'){
        this.updateVehicleType();
      }
    }
  }

  getVehicleTypeById(vehicleType_id:number){
    this.vehicleTypeService.getVehicleTypeById(vehicleType_id)
    .subscribe(
        res => {
        this.vehicleTypeForm.patchValue(res[0]);
        },
        err => {
          window.scrollTo(0, 0);
          this.message_error = err;
          setTimeout(() => {
            this.message_error = "";
          },5000);
          console.log(err);
        }
      );
  }

  createVehicleType(){
    this.vehicleTypeService.createVehicleType(this.vehicleTypeForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.vehicleTypeForm.get('name').value + " created successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
        this.vehicleTypeService.refreshList.next(true);
        this.vehicleTypeForm.reset();
      },
      err => {
        window.scrollTo(0, 0);
        this.message_error = err;
        setTimeout(() => {
          this.message_error = "";
        },5000);
        console.log(err);
      }
    );
  }

  updateVehicleType(){
    this.vehicleTypeService.updateVehicleType(this.vehicleTypeForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.vehicleTypeForm.get('name').value + " updated successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);

          this.vehicleTypeService.refreshList.next(true);
      },
      err => {
        window.scrollTo(0, 0);
        this.message_error = err;
        setTimeout(() => {
          this.message_error = "";
        },5000);

        console.log(err);
      }
    );
  }

  deleteVehicleType(event){
    if(this.selectedVehicleType_Id)
    {
      this.vehicleTypeService.deleteVehicleType(this.selectedVehicleType_Id).subscribe(
        res => {
          this.vehicleTypeService.refreshList.next(true);
          this.router.navigate(['/vehicleType/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.vehicleTypeForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
