import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { TransmissionType } from 'app/data-model';
import { TransmissionTypeService } from 'app/services/transmission-type/transmission-type.service';

@Component({
  selector: 'app-transmissionType-form',
  templateUrl: './transmission-type-form.component.html',
  styleUrls: ['./transmission-type-form.component.scss']
})
export class TransmissionTypeFormComponent implements OnInit {
  title : string = "Create Transmission Type";
  module :string="trasnmission type";
  mode :string="discard";
  message:string="";
  transmissionTypeForm: FormGroup;
  selectedTransmissionType_Id: any;
  submitted = false;

  constructor(private fb: FormBuilder, private transmissionTypeService:TransmissionTypeService, private router:Router, private route:ActivatedRoute) {
  }


  createForm() {
    this.transmissionTypeForm = this.fb.group({
      transmission_type_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.transmissionTypeForm.valid) {
      if(this.transmissionTypeService.selectedMode == 'Create'){
        this.createTransmissionType();
      }
      else if (this.transmissionTypeService.selectedMode == 'Edit'){
        this.updateTransmissionType();
      }
    }
  }

  getTransmissionTypeById(transmissionType_id:number){
    this.transmissionTypeService.getTransmissionTypeById(transmissionType_id)
    .subscribe(
        res => {
        this.transmissionTypeForm.patchValue(res[0]);
        },
        err => {
          console.log(err);
        }
      );
  }

  createTransmissionType(){
    this.transmissionTypeService.createTransmissionType(this.transmissionTypeForm.value)
    .subscribe(
      res => {
        this.transmissionTypeService.refreshList.next(true);
        this.transmissionTypeForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTransmissionType(){
    this.transmissionTypeService.updateTransmissionType(this.transmissionTypeForm.value)
    .subscribe(
      res => {
          this.transmissionTypeService.refreshList.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteTransmissionType(event){
    if(this.selectedTransmissionType_Id)
    {
      this.transmissionTypeService.deleteTransmissionType(this.selectedTransmissionType_Id).subscribe(
        res => {
          this.transmissionTypeService.refreshList.next(true);
          this.router.navigate(['/transmissionType/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.transmissionTypeForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();

    this.transmissionTypeService.selectedTransmissionTypeId
    .subscribe(
      res => {
        this.selectedTransmissionType_Id = res;
        if(this.transmissionTypeService.selectedMode == "Edit"){
          this.title = "Edit Transmission Type";
          this.mode = "delete";
          this.getTransmissionTypeById(res);
        }
      },
      err => {

      }
    );
  }

}
