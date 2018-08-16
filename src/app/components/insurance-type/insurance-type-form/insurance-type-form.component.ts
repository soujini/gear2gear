import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { InsuranceType } from 'app/data-model';
import { InsuranceTypeService } from 'app/services/insurance-type/insurance-type.service';

@Component({
  selector: 'app-insuranceType-form',
  templateUrl: './insurance-type-form.component.html',
  styleUrls: ['./insurance-type-form.component.scss']
})
export class InsuranceTypeFormComponent implements OnInit {
  title : string = "Create Insurance Type";
  module :string="insurance type";
  mode :string="discard";
  message:string="";
  insuranceTypeForm: FormGroup;
  selectedInsuranceType_Id: any;
  submitted = false;

  constructor(private fb: FormBuilder, private insuranceTypeService:InsuranceTypeService, private router:Router, private route:ActivatedRoute) {
  }


  createForm() {
    this.insuranceTypeForm = this.fb.group({
      insurance_type_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.insuranceTypeForm.valid) {
      if(this.insuranceTypeService.selectedMode == 'Create'){
        this.createInsuranceType();
      }
      else if (this.insuranceTypeService.selectedMode == 'Edit'){
        this.updateInsuranceType();
      }
    }
  }

  getInsuranceTypeById(insuranceType_id:number){
    this.insuranceTypeService.getInsuranceTypeById(insuranceType_id)
    .subscribe(
        res => {
        this.insuranceTypeForm.patchValue(res[0]);
        },
        err => {
          console.log(err);
        }
      );
  }

  createInsuranceType(){
    this.insuranceTypeService.createInsuranceType(this.insuranceTypeForm.value)
    .subscribe(
      res => {
        this.insuranceTypeService.refreshList.next(true);
        this.insuranceTypeForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateInsuranceType(){
    this.insuranceTypeService.updateInsuranceType(this.insuranceTypeForm.value)
    .subscribe(
      res => {
          this.insuranceTypeService.refreshList.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteInsuranceType(event){
    if(this.selectedInsuranceType_Id)
    {
      this.insuranceTypeService.deleteInsuranceType(this.selectedInsuranceType_Id).subscribe(
        res => {
          this.insuranceTypeService.refreshList.next(true);
          this.router.navigate(['/insuranceType/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.insuranceTypeForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();

    this.insuranceTypeService.selectedInsuranceTypeId
    .subscribe(
      res => {
        this.selectedInsuranceType_Id = res;
        if(this.insuranceTypeService.selectedMode == "Edit"){
          this.title = "Edit Insurance Type";
          this.mode = "delete";
          this.getInsuranceTypeById(res);
        }
      },
      err => {

      }
    );
  }

}
