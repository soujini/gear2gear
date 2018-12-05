import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Insurance } from 'app/data-model';
import { InsuranceService } from 'app/services/insurance/insurance.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss']
})
export class InsuranceFormComponent implements OnInit {
  title : string = "Create Insurance";
  module :string="insurance";
  mode :string="discard";
  message:string="";
  message_error:string="";
  insuranceForm: FormGroup;
  selectedInsurance_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder, private insuranceService:InsuranceService, private router:Router, private route:ActivatedRoute) {
    this.insuranceService.selectedInsuranceId.next(0);
    this.sub=this.insuranceService.selectedInsuranceId
    .subscribe(
      res => {
        this.selectedInsurance_Id = res;
        if(this.insuranceService.selectedMode == "Edit"){
          this.title = "Edit Insurance";
          this.mode = "delete";
          this.getInsuranceById(res);
        }
      },
      err => {

      }
    );
  }


  createForm() {
    this.insuranceForm = this.fb.group({
      insurance_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.insuranceForm.valid) {
      if(this.insuranceService.selectedMode == 'Create'){
        this.createInsurance();
      }
      else if (this.insuranceService.selectedMode == 'Edit'){
        this.updateInsurance();
      }
    }
  }

  getInsuranceById(insurance_id:number){
    this.insuranceService.getInsuranceById(insurance_id)
    .subscribe(
      res => {
        this.insuranceForm.patchValue(res[0]);
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

  createInsurance(){
    this.insuranceService.createInsurance(this.insuranceForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.insuranceForm.get('name').value + " created successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);

        this.insuranceService.refreshList.next(true);
        this.insuranceForm.reset();
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

  updateInsurance(){
    this.insuranceService.updateInsurance(this.insuranceForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.insuranceForm.get('name').value + " updated successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);

        this.insuranceService.refreshList.next(true);
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

  deleteInsurance(event){
    if(this.selectedInsurance_Id)
    {
      this.insuranceService.deleteInsurance(this.selectedInsurance_Id).subscribe(
        res => {
          this.insuranceService.refreshList.next(true);
          this.router.navigate(['/insurance/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.insuranceForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
