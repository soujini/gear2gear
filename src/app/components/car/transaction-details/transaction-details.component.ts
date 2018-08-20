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
  investors$: Observable<any>;
  @Input()
  transactionTypes$: Observable<any>;
  @Input()
  expenses$: Observable<any>;
  @Input()
  carForm: FormGroup;
  @Output()
  opMessage = new EventEmitter();
  // Type 'BehaviorSubject<number>' is not assignable to type 'number'.

  sold:boolean;
  message:string="";
  transactionDetailProfitandLoss=[];
  transactionDetailsForm: FormGroup;
  transactionDetails$:Observable<any>;
  investorsExpensesAndPercent$:Observable<any>;
  selectedCar_Id:number;

  total_investment_balance :any;
  available_balance:number;
  investors_available_balance:number;
  investors_total_expenses:number;
  investors_total_investment:number;

  constructor(
    private fb: FormBuilder,
    private carService:CarService,
    private clientService: ClientService,
    private transactionDetailsService:TransactionDetailsService
  ) {

  }

  ngOnInit() {
    this.createForm();

    this.carService.transactionDetail.subscribe(value =>{
      this.getTransactionDetailsById(this.carService.selectedCarId.getValue());
      this.selectedCar_Id = this.carService.selectedCarId.getValue();
      this.transactionDetailsForm.reset();
    });
    this.carService.sold.subscribe(value =>{
      if(value == true){
        this.sold=true;
        //Ensure this works only for Edit
        //Assign mandatory fields
        if(this.carForm.get('selling_price').value !=0 && this.carForm.get('selling_price').value != '' && this.carForm.get('selling_price').value != null){
        this.transactionDetailsService.getTotalInvestmentAndBalanceByCar(this.carForm.get('car_id').value)
        .subscribe(res => {
          if(res.length > 0){
            if(res[0].balance == 0)
            {
              this.getInvestorsExpensesAndPercent();
            }
            else{
              window.scrollTo(0, 0);
              this.message = "Please enter an investment amount to match the cost price",+res[0].balance;
              this.opMessage.emit(this.message);
              setTimeout(() => {
                this.message = "";
                this.opMessage.emit(this.message);
              },5000);
            }
          }
          else{
            window.scrollTo(0, 0);
            this.message = "Please enter an investment amount to match the cost price";
            this.opMessage.emit(this.message);
            setTimeout(() => {
              this.message = "";
              this.opMessage.emit(this.message);
            },5000);
          }
        },
        err =>{
          console.log("GetTotalInvestmentAndBalanceByCar ", err);
        });
      }
      else{
        this.opMessage.emit("Please enter a Selling Price");
        setTimeout(() => {
          this.opMessage.emit("");
        },5000);

      }
    }
    else{
      this.sold=false;
      //Get Investors Expenses and investors_percent
      this.clientService.getInvestorsExpensesAndPercent(this.carForm.get('car_id').value)
      .subscribe(res => {
        this.investorsExpensesAndPercent$ = res;
        this.transactionDetailsService.deleteProfitOrLossTransactionDetails(this.carForm.get('car_id').value, this.investorsExpensesAndPercent$)
        .subscribe(
          res => {
          },
          err =>{

          });
        });
      }
    });

  }//End of ng oninit

  getInvestorsExpensesAndPercent(){
    this.clientService.getInvestorsExpensesAndPercent(this.carForm.get('car_id').value)
    .subscribe(res => {
      this.investorsExpensesAndPercent$ = res;
      this.deleteProfitOrLossTransactionDetails();
    });
  }

  deleteProfitOrLossTransactionDetails(){
    this.transactionDetailsService.deleteProfitOrLossTransactionDetails(this.carForm.get('car_id').value, this.investorsExpensesAndPercent$)
    .subscribe(
      res => {
        //Create P & L Transaction Details
        this.createProfitOrLossTransactionDetails();
      },
      err =>{

      });
    }

    createProfitOrLossTransactionDetails(){
      var credit = 0;
      var debit = 0;
      var transaction_type_id = 0;
      var transaction_type_mode = '';
      this.transactionDetailProfitandLoss=[];
      //Loop through investors
      this.investorsExpensesAndPercent$.forEach(record => {
      console.log('Investors Expense and Investment Percent ',record);
      //Caculate investors total income from the car
      const investors_total_income_car = (parseFloat(record.investors_percent)/100) * parseInt(this.carForm.get('selling_price').value.toString().replace( /,/g, "" ));
      //Calculate total cost of the car(Expenses + Cost Price)
      const total_cost_price_car = parseInt(record.car_total_cost);
      //Calculate profit ot loss of the car
      const total_profit_car = parseInt(this.carForm.get('selling_price').value.toString().replace( /,/g, "" )) - total_cost_price_car;
      //Calculate investors profit or loss and update available balance
      const investors_total_profit_car = (parseFloat(record.investors_percent)/100) * total_profit_car; //Add to Transaction details as profit or loss

      console.log("x ", Math.round(investors_total_income_car));//Add this to available balance
      console.log("y ", Math.round(total_cost_price_car));
      console.log("z ", Math.round(total_profit_car));
      console.log("a ", Math.round(investors_total_profit_car));

      //Add a new transaction detail Profit or Loss
      if(investors_total_profit_car > 0){ //Profit
      credit = investors_total_profit_car;
      transaction_type_id = 3; //Profit
      transaction_type_mode = 'credit';
    }
    else{
      debit = investors_total_profit_car;
      transaction_type_id = 4; //Loss
      transaction_type_mode = 'debit';
    }

    //Enable Credit, Debit, Investor
    this.transactionDetailsForm.get('credit').enable();
    // this.transactionDetailsForm.get('credit').setValidators(Validators.required);
    this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});
    this.transactionDetailsForm.get('debit').enable();
    // this.transactionDetailsForm.get('credit').setValidators(Validators.required);
    this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});
    this.transactionDetailsForm.get('investor_id').enable();
    // this.transactionDetailsForm.get('credit').setValidators(Validators.required);
    this.transactionDetailsForm.get('investor_id').updateValueAndValidity({emitEvent:false, onlySelf:true});

    //Create ProfitOrLossTransactionDetails for each investor and update available balance
    //Patch transaction detail values
    this.transactionDetailsForm.patchValue({
    investor_id : record.investor_id,
    transaction_type_id: transaction_type_id,
    transaction_type_mode:transaction_type_mode,
    car_id: this.carForm.get('car_id').value,
    credit: Math.round(credit),
    debit: Math.round(debit),
  });
  this.transactionDetailsForm.updateValueAndValidity({emitEvent:false, onlySelf:true});
  this.transactionDetailProfitandLoss.push(this.transactionDetailsForm.value);
});//End of foreach

this.transactionDetailsService.createTransactionDetailsProfitAndLoss(this.transactionDetailProfitandLoss)
.subscribe(
  res => {
    this.transactionDetailsForm.reset();
  },
  err => {
    console.log(err);
  },
  () =>{
  });
}

createForm() {
  this.transactionDetailsForm = this.fb.group({
    date: ['', Validators.required],
    transaction_type_id: [Validators.required],
    transaction_type_mode:['', Validators.required],
    car_id:[Validators.required],
    investor_id: [{value:'', disabled:true}],
    expense_id:[{value:'', disabled:true}],
    description:['', [Validators.maxLength(500)]],
    credit:[{value:'', disabled:true}],
    debit:[{value:'', disabled:true}],
    cars_total_income:[''],
    investors_available_balance:[''],
    investors_total_expenses:[''],
    cars_total_cost:['']
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
    }
  });

  this.carService.selectedCarId
  .subscribe(
    res => {
      this.selectedCar_Id = res;
      if(this.carService.selectedMode == "Edit"){
        this.getTransactionDetailsById(res);
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
      this.transactionDetailsForm.get('credit').setValidators(Validators.required);
      this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});

      this.transactionDetailsForm.patchValue({'debit':''  });
      this.transactionDetailsForm.get('debit').clearValidators();
      this.transactionDetailsForm.get('debit').disable();
      this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});

      this.transactionDetailsForm.get('investor_id').clearValidators();
      this.transactionDetailsForm.get('investor_id').disable();
      this.transactionDetailsForm.get('investor_id').updateValueAndValidity({emitEvent:false, onlySelf:true});
    }
    else{
      this.transactionDetailsForm.get('debit').enable();
      this.transactionDetailsForm.get('debit').setValidators(Validators.required);
      this.transactionDetailsForm.get('debit').updateValueAndValidity({emitEvent:false, onlySelf:true});

      this.transactionDetailsForm.patchValue({'credit':''});
      this.transactionDetailsForm.get('credit').clearValidators();
      this.transactionDetailsForm.get('credit').disable();
      this.transactionDetailsForm.get('credit').updateValueAndValidity({emitEvent:false, onlySelf:true});

      //Enable Investor
      this.transactionDetailsForm.get('investor_id').enable();
      this.transactionDetailsForm.get('investor_id').setValidators(Validators.required);
      this.transactionDetailsForm.get('investor_id').updateValueAndValidity({emitEvent:false, onlySelf:true});

    }
  });
}

getTransactionDetailsById(car_id:any){
  this.transactionDetails$ = this.transactionDetailsService.getTransactionDetailsById(car_id);
}

//This function will create a transaction detail
//In case of Credit - It will also update the total_income of the car
//In case of Debit - It will update available_balance and total_expenses of the investors
//and will update the total cost of the car(debit)
createTransactionDetails(){
const investor_id = parseInt(this.transactionDetailsForm.get('investor_id').value);
const car_id = 0;
this.transactionDetailsForm.patchValue({
  car_id:parseInt(this.carForm.get('car_id').value),
});

if(this.transactionDetailsForm.get('transaction_type_mode').value == 'debit'){
  if(parseInt(this.transactionDetailsForm.get('debit').value.replace( /,/g, "" )) <= this.investors_available_balance){
    const total_cost = this.carForm.get('total_cost').value + parseInt(this.transactionDetailsForm.get('debit').value.replace( /,/g, "" ));

    this.transactionDetailsForm.patchValue({
      'investors_available_balance':this.available_balance,
      'investors_total_expenses':this.investors_total_expenses,
      'cars_total_cost':total_cost
    });

    this.transactionDetailsService.createTransactionDetails(this.transactionDetailsForm.value)
    .subscribe(
      res => {
        this.transactionDetailsForm.reset();
        this.getTransactionDetailsById(this.carService.selectedCarId.getValue());
      },
      err => {
        console.log(err);
      },
      () =>{

      }
    );
  }

  else{
    window.scrollTo(0, 0);
    this.message = "The selected investor's available balance is Rs " +this.investors_available_balance + ", which is less than the entered amount";
    setTimeout(() => {
      this.message ="";
    },5000);
  }
}

else{//credit
  const total_income = this.carForm.get('total_income').value + parseInt(this.transactionDetailsForm.get('credit').value.replace( /,/g, "" ));
  this.transactionDetailsForm.patchValue({
    'cars_total_income':total_income,
  });
  this.transactionDetailsService.createTransactionDetails(this.transactionDetailsForm.value)
  .subscribe(
    res => {
      this.transactionDetailsForm.reset();
      this.transactionDetailsService.refreshList.next(true);
    },
    err => {
      console.log(err);
    },
    () =>{

    }
  );
}
}

onSubmit(){
  this.transactionDetailsForm.patchValue({
    car_id:this.selectedCar_Id,
  });

  const mode = this.transactionDetailsForm.get('transaction_type_mode').value;
  if(mode == 'credit'){
    // Since the credit goes to the Car and not the investor, create TD
    this.createTransactionDetails();
  }
  else{
    this.getAvailableBalanceTotalExpensesTotalInvestment();
  }
}
getAvailableBalanceTotalExpensesTotalInvestment(){
  if (this.transactionDetailsForm.valid) {
    const investor_id = parseInt(this.transactionDetailsForm.get('investor_id').value);
    this.clientService.getAvailableBalance(investor_id).subscribe(res => {
      this.total_investment_balance = res;
      if(res.total_investment != null){
        this.investors_total_investment = parseInt(res.total_investment.toString().replace( /,/g, "" ));
      }
      if(res.total_expenses != null){
        this.investors_total_expenses = parseInt(res.total_expenses.toString().replace( /,/g, "" ));
      }

      if(this.transactionDetailsForm.get('transaction_type_id').value == 1){ //If it is an Investment
        this.checkInvestmentBalance();
      }
      else{
        this.investors_total_expenses = parseInt(res.total_expenses) + parseInt(this.transactionDetailsForm.get('debit').value.toString().replace( /,/g, "" ));
        this.available_balance = parseInt(res.total_investment) - this.investors_total_expenses;
        this.createTransactionDetails();
      }
    },
    err => {
      console.log("Get Available Balance ",err);
    });
  }
}
//Get Investment amount balance investment amount
checkInvestmentBalance() :any {
var invalid_amount;
this.transactionDetailsService.getTotalInvestmentAndBalanceByCar(this.carForm.get('car_id').value)
.subscribe(res => {

  if(res.length > 0 ){
    const investment_amount = parseInt(this.transactionDetailsForm.get('debit').value.toString().replace( /,/g, "" ));
    if(investment_amount > parseInt(res[0].balance)){
      invalid_amount = true;
      this.message = "The maximum amount cannot exceed the balance of Rs. " +res[0].balance;
      setTimeout(() => {
        this.message = "";
      },5000);

    }
    else{
      invalid_amount = false;
    }
  }
  else{ //If there are no rows present, check amount against cost price.
    const investment_amount = parseInt(this.transactionDetailsForm.get('debit').value.toString().replace( /,/g, "" ));
    const cost_price = parseInt(this.carForm.get('cost_price').value.toString().replace( /,/g, "" ));
    if(investment_amount > cost_price){
      invalid_amount = true;
      this.message = "The maximum amount cannot exceed the balance of Rs. " +cost_price;
      setTimeout(() => {
        this.message = "";
      },5000);

    }
    else{
      invalid_amount = false;
    }
  }
},
err =>{
  console.log("Check Investment balance ",err);
},
() =>{
  if(invalid_amount == false){
    this.investors_total_expenses = parseInt(this.total_investment_balance.total_expenses) + parseInt(this.transactionDetailsForm.get('debit').value.toString().replace( /,/g, "" ));
    this.available_balance = parseInt(this.total_investment_balance.total_investment) - this.investors_total_expenses;
    this.createTransactionDetails();
  }
});
}
validateAmountAgainstBalance(){
  const investor_id = this.transactionDetailsForm.get('investor_id').value;
  this.clientService.getAvailableBalance(investor_id).subscribe(res => {
    this.investors_available_balance = (parseInt(res.available_balance.toString().replace( /,/g, "" )));
  }, err =>{
  });
}
formatCurrency(control){
  var val = control.value;
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
}
