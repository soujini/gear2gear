import { Component, OnInit, Input, Output, EventEmitter ,ChangeDetectorRef} from '@angular/core';
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
  transactionTypes$: Observable<any>;

  @Input()
  refreshTD: Observable<any>;

  @Input()
  expenses$: Observable<any>;

  @Input()
  carForm: FormGroup;

  @Output()
  opMessage = new EventEmitter();

  @Output()
  opFunction = new EventEmitter();

  transactionDetails$:Observable<any>;
  transactionDetailProfitandLoss=[];
  transactionDetailsForm: FormGroup;
  selectedCar_Id:number;
  total_cost_car:number=0;
  total_money_received:number;
  total_money_invested:number;
  sold:boolean;
  message:string="";
  private sub;
  private sub1;
  private sub2;
  total_credits:string;
  total_debits:string;
  mode:String="Void";
  module:String="transaction";
  message_error:String="";

  constructor(
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private carService:CarService,
    private clientService: ClientService,
    private transactionDetailsService:TransactionDetailsService
  ) {


    this.createForm();

    this.sub = this.carService.transactionDetail.subscribe(value =>{
      this.getTransactionDetailsById(this.carService.selectedCarId.getValue());
      this.selectedCar_Id = this.carService.selectedCarId.getValue();
    });

    this.sub1 = this.carService.sold.subscribe(value =>{
      if(value == true){

        if(this.carForm.get('selling_price').value !=0 && this.carForm.get('selling_price').value != '' && this.carForm.get('selling_price').value != null){
          this.sold=true;

          //Calculate Profit
          const Profit = parseInt(this.carForm.get('selling_price').value.toString().replace( /,/g, "" )) - this.total_cost_car;
          // console.log("SP   ",parseInt(this.carForm.get('selling_price').value.toString().replace( /,/g, "" )));
          // console.log("total cost of the car ",this.total_cost_car);
          // console.log("Profit in tran detail line 65 ", Profit);

          //Split Owner Percent and Investors Percent
          const OwnersAmount = 60/100 * Profit;
          //const InvestorsAmount = 40/100 * Profit;
          const InvestorsAmount = Profit - OwnersAmount;

          // console.log("Owners Amt ", OwnersAmount);
          // console.log("Investors Amt ", InvestorsAmount);

          this.transactionDetailsService.GetInvestorsInvestmentAndPercentDetailsByPurchaseDate(this.carForm.get('purchased_on').value).subscribe(res=>{
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();

            this.transactionDetailProfitandLoss=[];
            res.forEach(investor=>{
              var debit =0;
              var credit=0;
              var transaction_type_id=0;
              var transaction_type_mode="";
              var investor_percent = investor.investor_percent;
              // let profitAmount = parseFloat(investor_percent /100) * InvestorsAmount;
              var profitAmount = ((investor_percent /100.00) * InvestorsAmount).toString();
              var description="";

              //Enable Credit, Debit, Investor
              this.transactionDetailsForm.get('credit').enable();
              this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});
              this.transactionDetailsForm.get('debit').enable();
              this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});
              this.transactionDetailsForm.get('investor_id').enable();
              this.transactionDetailsForm.get('investor_id').updateValueAndValidity({emitEvent:false, onlySelf:true});

              if(parseFloat(profitAmount) > 0){ //Profit
                credit = parseFloat(profitAmount);
                transaction_type_id = 3; //Profit
                transaction_type_mode = 'credit';
                description="Profit Earned";
              }
              else{
                debit = parseFloat(profitAmount);
                var removeNegativeSign = profitAmount.toString().replace(/-/g, '');
                debit = parseInt(removeNegativeSign);
                transaction_type_id = 4; //Loss
                transaction_type_mode = 'debit';
                description="Loss Incurred";
              }

              //Patch transaction detail values
              this.transactionDetailsForm.patchValue({
                investor_id : investor.investor_id,
                transaction_type_id: transaction_type_id,
                transaction_type_mode:transaction_type_mode,
                car_id: this.carForm.get('car_id').value,
                credit: credit,
                debit: debit,
                description:description,
                date:yyyy+"-"+mm+"-"+dd,
                percentage:investor_percent,
              });

              //Add individual to array and bulk send to create P&L details
              //this.transactionDetailsForm.updateValueAndValidity({emitEvent:false, onlySelf:true});
              this.transactionDetailProfitandLoss.push(this.transactionDetailsForm.value);
            })//End of Investors Foreach

            //CREATE OWNER PROFIT TRANSACTION DETAILS
            var debit =0;
            var credit=0;
            var transaction_type_id=0;
            var transaction_type_mode="";
            let profitAmount = OwnersAmount;
            var description="";

            if(profitAmount > 0){ //Profit
              credit = profitAmount;
              transaction_type_id = 3; //Profit
              transaction_type_mode = 'credit';
              description="Owner Profit Earned";
            }
            else{
              debit = profitAmount;
              var removeNegativeSign = profitAmount.toString().replace(/-/g, '');
              debit = parseInt(removeNegativeSign);
              transaction_type_id = 4; //Loss
              transaction_type_mode = 'debit';
              description="Owner Loss Incurred";
            }

            this.transactionDetailsForm.patchValue({
              investor_id : 68,
              transaction_type_id: transaction_type_id,
              transaction_type_mode:transaction_type_mode,
              car_id: this.carForm.get('car_id').value,
              credit: credit,
              debit: debit,
              description:description,
              // date:yyyy+"-"+mm+"-"+dd,
              date:'2018-11-15',
              percentage:null,
            });

            this.transactionDetailProfitandLoss.push(this.transactionDetailsForm.value);
            console.log("P&L details ",this.transactionDetailProfitandLoss);
            // Create P&L Transaction Detail for all investors and Update Car with IS_Sold = true
            this.transactionDetailsService.createTransactionDetailsProfitAndLoss(this.transactionDetailProfitandLoss)
            .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe(
              res => {
                this.transactionDetailsForm.reset();
                this.carService.refreshCar.next(true);
                this.transactionDetailsService.refreshTD.next(true);
              },
              err=>{
                console.log("createTransactionDetailsProfitAndLoss ", err);
              }
            ); //End of createTransactionDetailsProfitAndLoss

          },//End of response GetInvestorsInvestmentAndPercentDetails
          err=>{
            console.log("GetInvestorsInvestmentAndPercentDetails =>",err)
          });//End of GetInvestorsInvestmentAndPercentDetails


        }//End of if selling price exists
        else{
          this.opMessage.emit("Please enter a Selling Price");
          setTimeout(() => {
            this.opMessage.emit("");
          },5000);
        }//End of if selling price DOES NOT exist

      } //End of is_sold value == true

      else if(value == false){ //If sold is false delete p&l tran details and update car is sold=false
        this.deleteProfitOrLossTransactionDetails();
      }

    });//End of carService.sold.subscribe

    this.sub2 = this.transactionDetailsService.refreshTD.subscribe(value =>{
      console.log("refreshing td => get tran details by id   ",this.carService.selectedCarId.getValue());
      this.getTransactionDetailsById(this.carService.selectedCarId.getValue());
    });
  }

  ngOnInit() {

    this.transactionDetailsForm.reset();

  }//End of ng oninit

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  deleteProfitOrLossTransactionDetails(){
    this.transactionDetailsService.deleteProfitOrLossTransactionDetails(this.carService.selectedCarId.getValue())
    .subscribe(
      res => {
        this.transactionDetailsService.refreshTD.next(true);
        this.carService.refreshCar.next(true);
      },
      err =>{

      });
    }

    voidTransaction(transactionDetails){
          this.transactionDetailsService.voidTransactionDetails(transactionDetails)
          .subscribe(
            res=>{
              this.getTransactionDetailsById(this.selectedCar_Id);
            },
            err=>{
              console.log("Void Transaction Details ", err);
            });


      // var balance = this.total_balance.replace (/,/g, "");
      // //If investment => check if balance is there
      // //If withdrawal => Check if balance is there
      //
      // if(transactionDetails.transaction_type_id == 11){ //Withdrawal
      //   if(parseInt(balance) < parseInt(transactionDetails.debit))
      //   {
      //     this.message_error="Not enough available balance - Cannot void this transaction";
      //     setTimeout(() => {
      //       this.message_error = "";
      //     },5000);
      //   }
      //   else{
      //     this.transactionDetailsService.voidTransactionDetails(transactionDetails)
      //     .subscribe(
      //       res=>{
      //         this.getTransactionDetailsByInvestor(this.selectedClient_Id);
      //       },
      //       err=>{
      //         console.log("Void Transaction Details ", err);
      //       });
      //     }
      //   }
      //
      //   else if(transactionDetails.transaction_type_id == 1){ //Investment
      //     if(parseInt(balance) < parseInt(transactionDetails.credit))
      //     {
      //       this.message_error="Not enough available balance - Cannot void this transaction";
      //       this.transactionDetailsForm.reset();
      //       setTimeout(() => {
      //         this.message_error = "";
      //       },5000);
      //     }
      //     else{
      //       this.transactionDetailsService.voidTransactionDetails(transactionDetails)
      //       .subscribe(
      //         res=>{
      //           this.getTransactionDetailsByInvestor(this.selectedClient_Id);
      //         },
      //         err=>{
      //           console.log("Void Transaction Details ", err);
      //         });
      //       }
      //     }
        }

    createForm() {
      this.transactionDetailsForm = this.fb.group({
        date: ['', Validators.required],
        transaction_type_id: [Validators.required],
        transaction_type_mode:['', Validators.required],
        car_id:[Validators.required],
        investor_id: [''],
        expense_id:[{value:'', disabled:true}],
        description:['', [Validators.maxLength(500)]],
        credit:[{value:'', disabled:true}],
        debit:[{value:'', disabled:true}],
        credit_formatted:[],
        debit_formatted:[],
        percentage:[]
      });
      this.transactionDetailsForm.get('transaction_type_id')

      .valueChanges.subscribe((transaction_type_id: string) => {
        if(transaction_type_id == "2"){ //Expense
          this.transactionDetailsForm.get('expense_id').enable();
          this.transactionDetailsForm.get('expense_id').setValidators(Validators.required);
          this.transactionDetailsForm.get('expense_id').updateValueAndValidity({emitEvent:false, onlySelf:true});
        }
        else{
          this.transactionDetailsForm.get('expense_id').clearValidators();
          this.transactionDetailsForm.get('expense_id').disable();
          this.transactionDetailsForm.get('expense_id').updateValueAndValidity({emitEvent:false, onlySelf:true});

          this.transactionDetailsForm.patchValue({
            expense_id:0,
            credit:"",
            debit:""
          });
        }
      });

      this.carService.selectedCarId
      .subscribe(
        res => {
          this.selectedCar_Id = res;
          if(this.carService.selectedMode == "Edit"){
            // this.getTransactionDetailsById(res);
          }
        },
        err => {

        }
      );

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

    getTransactionDetailsById(car_id:any){
      //this.transactionDetailsForm.reset();
      this.transactionDetails$ = this.transactionDetailsService.getTransactionDetailsById(car_id);
      let total_debits="0.00";
      let total_credits="0.00";

      this.transactionDetails$.subscribe(res=>{
        this.total_cost_car=0;
        this.total_money_received=0;
        this.total_money_invested=0;

          res.forEach(val=>{
            if(val.is_void != true){
              if(val.transaction_type_mode == "credit")
              {
                total_credits= (parseFloat(total_credits) +parseFloat(val.credit)).toString();
              }
              else if(val.transaction_type_mode == "debit"){
                total_debits = (parseFloat(total_debits) + parseFloat(val.debit)).toString();
                this.total_cost_car = this.total_cost_car + parseFloat(val.debit);
              }

              if(val.transaction_type_id == 13){
                this.total_money_received=this.total_money_received + parseFloat(val.credit);
              }
              if(val.transaction_type_id == 12){
                this.total_money_invested=this.total_money_invested + parseFloat(val.debit);
              }

              this.total_credits = this.formatCurrencyByVal(total_credits);
              this.total_debits = this.formatCurrencyByVal(total_debits);
          }
        })
      },
      err=>{
        console.log(err);
      });
    }

    onSubmit(){
      this.transactionDetailsForm.patchValue({
        car_id:this.selectedCar_Id,
      });

      if(this.transactionDetailsForm.get('transaction_type_mode').value == "debit"){
        //Purchase Transaction Type Should match Cost Price
        if(this.transactionDetailsForm.get('transaction_type_id').value == 12){
          var cp = parseInt(this.carForm.get('cost_price').value.toString().replace( /,/g, "" ));
          var debit = parseInt(this.transactionDetailsForm.get('debit').value.toString().replace( /,/g, "" ));
          var tot = this.total_money_invested + debit;

          if(tot>cp){
            this.opMessage.emit("Purchase Type transactions should not exceed the Cost Price "+this.carForm.get('cost_price').value);

            setTimeout(() => {
              this.opMessage.emit("");
            },5000);
          }
          else{
            //this.createTransactionDetails();
            this.getAvailablePoolBalanceAsOfPurchaseDate();
          }
        }
        else{
            //this.createTransactionDetails();
            this.getAvailablePoolBalanceAsOfPurchaseDate();
        }
      }
      else{

        //Sold Transaction Type Should match Selling Price
       if(this.transactionDetailsForm.get('transaction_type_id').value == 13)
        {
          var sp = parseInt(this.carForm.get('selling_price').value.toString().replace( /,/g, "" ));
          var credit = parseInt(this.transactionDetailsForm.get('credit').value.toString().replace( /,/g, "" ));
          var tot = this.total_money_received + credit;

          if(tot>sp)
          {
            this.opMessage.emit("Sold Type transactions should not exceed the Selling Price "+this.carForm.get('selling_price').value);

            setTimeout(() => {
              this.opMessage.emit("");
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
      //this.transactionDetailsForm.reset();

    }

    getAvailablePoolBalanceAsOfPurchaseDate()
    {
      var formattedDate = this.carForm.get('purchased_on').value.split('T');
      var debit = 0;
      var total_debits = 0;
      this.transactionDetailsService.getAvailablePoolBalanceAsOfPurchaseDate(formattedDate[0].toString())
      .subscribe(
        res => {
           debit = parseInt(this.transactionDetailsForm.get('debit').value.toString().replace( /,/g, "" ));
          if(parseInt(res[0].available_balance) < debit)
          {
            this.opMessage.emit("Insufficient funds in the Gear2Gear Pool - Balance is "+parseInt(res[0].available_balance));
            this.transactionDetailsForm.reset();
            setTimeout(() => {
              this.opMessage.emit("");
            },5000);
          }
          else{
            this.createTransactionDetails();
          }
        },
        err => {
          console.log(err);
        },
        () =>{

        }
      );
    }

    deleteTransactionDetails(transations_Details_id:number){
      this.transactionDetailsService.deleteTransactionDetails(transations_Details_id)
      .subscribe(
        res => {
          console.log("Transaction Details for Purchase Type has been deleted, since purchase transactions exceed the cost price(Might have happened when cost price was reduced and updated at some point)")
        },
        err => {
          console.log(err);
        },
        () =>{

        }
      );
    }
    createTransactionDetails(){
      const car_id = 0;
      this.transactionDetailsForm.patchValue({
        car_id:parseInt(this.carForm.get('car_id').value),
      });
      this.transactionDetailsService.createTransactionDetails(this.transactionDetailsForm.value)
      .subscribe(
        res => {
          this.transactionDetailsForm.reset();
          this.getTransactionDetailsById(this.carService.selectedCarId.getValue());
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
      else{
        control.setValue("");
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
