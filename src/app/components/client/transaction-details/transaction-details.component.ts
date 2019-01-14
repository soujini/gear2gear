import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientService } from 'app/services/client/client.service';
import { CarService } from 'app/services/car/car.service';
import { TransactionDetailsService } from 'app/services/transaction-details/transaction-details.service';


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @Input()
  investor_id: number;

  @Input()
  refreshTD: Observable<any>;
  @Input()
  investors$: Observable<any>;
  @Input()
  transactionTypes$: Observable<any>;
  @Input()
  clientForm: FormGroup;
  @Output()
  opMessage = new EventEmitter();
  transactionDetailsForm: FormGroup;
  transactionDetails$:Observable<any>;
  selectedClient_Id:number;
  private sub;
  private sub1;
  total_investment:string;
  total_withdrawal:String;
  total_balance:String;
  mode:String="Void";
  module:String="transaction";
  message_error:String="";

  constructor(
    private fb: FormBuilder,
    // private carService:CarService,
    private clientService: ClientService,
    private transactionDetailsService:TransactionDetailsService
  ) {
    this.sub = this.clientService.selectedClientId
    .subscribe(
      res => {
        this.selectedClient_Id=res;
        this.getTransactionDetailsByInvestor(res);
      },
      err=>{

      });
    }

    ngOnInit() {
      this.createForm();
      this.selectedClient_Id = this.investor_id;
      this.getTransactionDetailsByInvestor(this.investor_id);
      this.transactionDetailsForm.reset();
    }//End of ng oninit

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    createForm() {
      this.transactionDetailsForm = this.fb.group({
        date: ['', Validators.required],
        transaction_type_id: [Validators.required],
        transaction_type_mode:['', Validators.required],
        investor_id: [''],
        description:['', [Validators.maxLength(500)]],
        credit:[{value:'', disabled:true}],
        debit:[{value:'', disabled:true}],
        credit_formatted:[],
        debit_formatted:[]
      });

    }

    voidTransaction(transactionDetails){
      var balance = this.total_balance.replace (/,/g, "");
      //If investment => check if balance is there
      //If withdrawal => Check if balance is there

      if(transactionDetails.transaction_type_id == 11){ //Withdrawal
        if(parseInt(balance) < parseInt(transactionDetails.debit))
        {
          this.message_error="Not enough available balance - Cannot void this transaction";
          setTimeout(() => {
            this.message_error = "";
          },5000);
        }
        else{
          this.transactionDetailsService.voidTransactionDetails(transactionDetails)
          .subscribe(
            res=>{
              this.getTransactionDetailsByInvestor(this.selectedClient_Id);
            },
            err=>{
              console.log("Void Transaction Details ", err);
            });
          }
        }

        else if(transactionDetails.transaction_type_id == 1){ //Investment
          if(parseInt(balance) < parseInt(transactionDetails.credit))
          {
            this.message_error="Not enough available balance - Cannot void this transaction";
            this.transactionDetailsForm.reset();
            setTimeout(() => {
              this.message_error = "";
            },5000);
          }
          else{
            this.transactionDetailsService.voidTransactionDetails(transactionDetails)
            .subscribe(
              res=>{
                this.getTransactionDetailsByInvestor(this.selectedClient_Id);
              },
              err=>{
                console.log("Void Transaction Details ", err);
              });
            }
          }
        }
        getSelectedTransactionTypeMode(transactionTypeId){
          let transactionType;
          this.transactionTypes$.subscribe(res=>{
            transactionType = res.filter(tt => tt.transaction_type_id == transactionTypeId);
            this.transactionDetailsForm.patchValue({
              transaction_type_mode:transactionType[0].mode,
            });

            if(transactionType[0].mode == "credit"){
              this.transactionDetailsForm.get('credit').enable();
              this.transactionDetailsForm.get('credit').setValidators([Validators.required, Validators.min(1)]);
              this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});

              this.transactionDetailsForm.patchValue({'debit':''  });
              this.transactionDetailsForm.get('debit').clearValidators();
              this.transactionDetailsForm.get('debit').disable();
              this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});
            }
            else{
              this.transactionDetailsForm.get('debit').enable();
              this.transactionDetailsForm.get('debit').setValidators([Validators.required, Validators.min(1)]);
              this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});

              this.transactionDetailsForm.patchValue({'credit':''});
              this.transactionDetailsForm.get('credit').clearValidators();
              this.transactionDetailsForm.get('credit').disable();
              this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});
            }
          });
        }

        getTransactionDetailsByInvestor(investor_id:any){
          this.transactionDetailsForm.reset();
          this.transactionDetails$ = this.transactionDetailsService.getTransactionDetailsByInvestor(investor_id);
          let total_investment = 0;
          let total_withdrawal = 0;
          this.total_balance="";
          this.total_investment="";
          this.total_withdrawal="";

          this.transactionDetails$.subscribe(
            res=>{
              res.forEach(val=>{
                if(val.transaction_type_mode == "credit" && val.is_void != true)
                {
                  total_investment = total_investment + parseInt(val.credit);
                }
                else if(val.transaction_type_mode == "debit" && val.is_void != true){
                  total_withdrawal = total_withdrawal + parseInt(val.debit);
                }

                this.total_balance = this.formatCurrencyByVal(total_investment - total_withdrawal);
                this.total_investment = this.formatCurrencyByVal(total_investment).toString();
                this.total_withdrawal = this.formatCurrencyByVal(total_withdrawal).toString();
              });
            },
            err=>{

            }
          )
        }

        onSubmit(){
          var description="";
          var mode="";
          if(this.transactionDetailsForm.get('description').value == "" || this.transactionDetailsForm.get('description').value == null){
            if(this.transactionDetailsForm.get('transaction_type_id').value == 1){
              description="Investment";
            }
            else if(this.transactionDetailsForm.get('transaction_type_id').value == 11){
              description="Withdrawal"
            }
          }
          else{
            description = this.transactionDetailsForm.get('description').value;
          }

          this.transactionDetailsForm.patchValue({
            investor_id:this.selectedClient_Id,
            description:description
          });

          if(this.transactionDetailsForm.get('transaction_type_id').value == 11){
            //If withdrawal or void check if there is available balance
            var balance = this.total_balance.replace (/,/g, "");
            if(parseInt(balance) < parseInt(this.transactionDetailsForm.get('debit').value.replace (/,/g, "")))
            {
              this.message_error="Not enough available balance";
              this.transactionDetailsForm.reset();
              setTimeout(() => {
                this.message_error = "";
              },5000);
            }
            else{
              this.createTransactionDetails();
            }
          }
          else{
            this.createTransactionDetails();
          }
        }
        createTransactionDetails(){
          this.transactionDetailsService.createTransactionDetailsForClient(this.transactionDetailsForm.value)
          .debounceTime(1000)
          .distinctUntilChanged()
          .subscribe(
            res => {
              this.getTransactionDetailsByInvestor(this.selectedClient_Id);
              this.transactionDetailsForm.reset();

              this.transactionDetailsForm.patchValue({'debit':''  });
              this.transactionDetailsForm.get('debit').clearValidators();
              this.transactionDetailsForm.get('debit').disable();
              this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});

              this.transactionDetailsForm.patchValue({'credit':''  });
              this.transactionDetailsForm.get('credit').clearValidators();
              this.transactionDetailsForm.get('credit').disable();
              this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});
            },
            err => {
              console.log(err);
            },
            () =>{

            }
          );
        }

        formatCurrency(control){
          var val = control.value;
          var isValid = /^[0-9,.]*$/.test(val);
          if(isValid == true)
          {
            let x = val.toString().replace( /,/g, "" );
            var afterPoint = '';
            if(x.indexOf('.') > 0)
            afterPoint = x.substring(x.indexOf('.'),x.length);
            x = Math.floor(x);
            x = x.toString();
            var lastThree = x.substring(x.length-3);
            var otherNumbers = x.substring(0,x.length-3);
            if(otherNumbers != '')
            lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            control.setValue(res);
          }
          else {
            control.value ="";
          }
        }
        formatCurrencyByVal(val){
          let val1 = ''+val;
          let x = val1.replace( /,/g, "" );
          var afterPoint = '';
          if(x.indexOf('.') > 0)
          afterPoint = x.substring(x.indexOf('.'),x.length);
          x = Math.floor(parseInt(x)).toString();
          var lastThree = x.substring(x.length-3);
          var otherNumbers = x.substring(0,x.length-3);
          if(otherNumbers != '')
          lastThree = ',' + lastThree;
          var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
          return res;
        }
      }
