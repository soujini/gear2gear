import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'app/data-model';
import { ClientService } from 'app/services/client/client.service';
import { CommonService } from 'app/services/common/common.service';
import { TransactionTypeService } from 'app/services/transaction-type/transaction-type.service';

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
  message_error:string="";
  clientForm: FormGroup;
  selectedClient_Id: any;
  selectedMode: any;
  submitted = false;
  private sub;

  transactionTypes$:Observable<any>;

  constructor(
    private fb: FormBuilder,
    public clientService:ClientService,
    private commonService: CommonService,
    private transactionTypeService: TransactionTypeService,
    private router:Router,
    private route:ActivatedRoute) {

      this.sub = this.clientService.selectedClientId
      .subscribe(
        res => {
          this.selectedClient_Id = res;
          if(this.clientService.selectedMode == "Get" || this.clientService.selectedMode == "Edit"){
            this.title = "Edit Client";
            this.mode = "delete";
            this.getClientById(res);
            this.clientService.transactionDetail.next("true");
          }
        },
        err => {

        }
      );
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
        is_owner:[false]
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

    selectClient(client_id:number){
        this.clientService.selectedMode = 'Edit';
        this.router.navigate(['/client/edit']);
        setTimeout(() => {
          this.clientService.selectedClientId.next(client_id);
        }, 100);
    }

    getClientById(client_id:number){
      this.clientService.getClientById(client_id)
      .subscribe(
        res => {
          this.patchForm(res[0]);
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
        is_owner:res.is_owner
      });

    }

    createClient(){
      this.clientService.createClient(this.clientForm.value)
      .subscribe(
        res => {
          window.scrollTo(0, 0);
          this.message = this.clientForm.get('name').value + " created successfully.";
          setTimeout(() => {
            this.message = "";
          },5000);
          this.clientService.refreshList.next(true);
          this.clientForm.reset();
           this.selectClient(parseInt(res.client_id));
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

    updateClient(){
      this.clientService.updateClient(this.clientForm.value)
      .subscribe(
        res => {
          window.scrollTo(0, 0);
          this.message = this.clientForm.get('name').value + " updated successfully.";
          setTimeout(() => {
            this.message = "";
          },5000);
          this.clientService.refreshList.next(true);
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

    getTransactionTypesForClient()  {
      this.transactionTypes$ = this.transactionTypeService.getTransactionTypesForClient();
    }

    ngOnInit() {
      setTimeout(() => {
        window.scrollTo(0,0);
        //this.router.navigate(['/car/add']);
      },500);
      this.createForm();
      this.getTransactionTypesForClient();
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
  }
