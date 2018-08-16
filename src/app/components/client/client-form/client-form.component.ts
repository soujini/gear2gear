import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'app/data-model';
import { ClientService } from 'app/services/client/client.service';
import { CommonService } from 'app/services/common/common.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  title : string = "Create Client";
  module :string="client";
  mode :string="discard";
  message:string="";
  clientForm: FormGroup;
  selectedClient_Id: any;
  selectedMode: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private clientService:ClientService,
    private commonService: CommonService,
    private router:Router,
    private route:ActivatedRoute) {

    }

    createForm() {
      this.clientForm = this.fb.group({
        client_id: [''],
        name: ['', [Validators.required,Validators.maxLength(50)]],
        phone: ['', [Validators.required,Validators.maxLength(12)]],
        email: ['', [Validators.maxLength(50)]],
        address: ['', [Validators.maxLength(100)]],
        city: ['', [Validators.maxLength(50)]],
        state: [],
        pin: ['',Validators.maxLength(10)],
        is_investor:[false],
        investment_records: this.fb.array([]),
        total_investment:[0],
        total_expenses:[0],
        available_balance:[0]
      });
    }

    createInvestmentRecord(): FormGroup {
      return this.fb.group({
        date: [],
        amount: [],
        is_void: [false],
        is_disabled:[false],
        is_void_disabled:[false]
      });
    }

    addItem(): void {
      const control = <FormArray> this.clientForm.controls['investment_records'];
      control.push(this.createInvestmentRecord());
    }

    onSubmit(){
      this.submitted = true;
      if (this.clientForm.valid) {
        if(this.clientService.selectedMode == 'Create'){
          this.createClient();
        }
        else if (this.clientService.selectedMode == 'Edit' || this.clientService.selectedMode == 'Get'){
          this.updateClient();
        }
      }
    }

    getClientById(client_id:number){
      this.clientService.getClientById(client_id)
      .subscribe(
        res => {
          this.patchForm(res[0]);
        },
        err => {
          console.log(err);
        }
      );
    }

    patchForm(res){
        //this.clientForm.patchValue(res);
      this.clientForm.patchValue({
        client_id: res.client_id,
        name: res.name,
        phone: res.phone,
        email: res.email,
        address: res.address,
        city: res.city,
        state: res.state,
        pin: res.pin,
        is_investor: res.is_investor,
        total_investment: res.total_investment
      });
      if(res.investment_records != null){
        //Disable is_investor if investment records exist
        // this.clientForm.get('is_investor').disable();

        let control = <FormArray>this.clientForm.controls.investment_records;
        //Clear Form Array
        while (control.length !== 0) {
        control.removeAt(0)
      }
      //Patch Investment Records Array
      res.investment_records.forEach(record => {
      let is_void_disabled = false;
      if(record.is_void == true){
        is_void_disabled=true;
      }
      control.push(this.fb.group({date: record.date, amount: record.amount, is_void:record.is_void, is_disabled:true, is_void_disabled:is_void_disabled}))
    })
  }
}

createClient(){
  if(this.clientForm.controls.is_investor.value == true){
  this.clientForm.patchValue({
    total_investment: this.getTotalInvestment(),
    available_balance: this.getTotalInvestment()
  });
}

  this.clientService.createClient(this.clientForm.value)
  .subscribe(
    res => {
      this.clientService.refreshList.next(true);
      this.router.navigate(['/client/add']);
      this.clientForm.reset();
    },
    err => {
      console.log(err);
    }
  );
}

getTotalInvestment(){
  let total_investment = 0;
  this.clientForm.controls.investment_records.value.forEach(record => {
    if(record.is_void == false){
    total_investment = total_investment + parseInt(record.amount.replace( /,/g, "" ));
  }
  });
  return total_investment;
}

updateClient(){
  let x = this.getTotalInvestment();
  let y = this.clientForm.controls.total_expenses.value;

  this.clientForm.patchValue({
    total_investment: x,
    available_balance: x-y,
  });

  this.clientService.updateClient(this.clientForm.value)
  .subscribe(
    res => {
      this.clientService.refreshList.next(true);
      this.router.navigate(['/client/add']);
    },
    err => {
      console.log(err);
    }
  );
}

deleteClient(event){
  if(this.selectedClient_Id){
    this.clientService.deleteClient(this.selectedClient_Id).subscribe(
      res => {
        this.clientService.refreshList.next(true);
        this.router.navigate(['/client/add']);
      },
      err => {
        console.log(err);
      }
    );
  }
  else{
    this.clientForm.reset();
  }
}
formatCurrency(control){
  var val = control.value;
  let x = val.toString().replace( /,/g, "" );
  var afterPoint = '';
  if(x.indexOf('.') > 0)
  afterPoint = x.substring(x.indexOf('.'),x.length);
  x = Math.floor(x);
  x=x.toString();
  var lastThree = x.substring(x.length-3);
  var otherNumbers = x.substring(0,x.length-3);
  if(otherNumbers != '')
  lastThree = ',' + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  control.setValue(res);
}
ngOnInit() {
  this.createForm();
  this.clientService.selectedClientId
  .subscribe(
    res => {
      this.selectedClient_Id = res;
      if(this.clientService.selectedMode == "Get"){
        this.title = "Edit Client";
        this.mode = "delete";
        this.getClientById(res);
      }
    },
    err => {

    }
  );
}
}
