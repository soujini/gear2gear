import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientService } from 'app/services/client/client.service';

import { CarService } from 'app/services/car/car.service';
import { TransactionDetailsService } from 'app/services/transaction-details/transaction-details.service';


@Component({
  selector: 'app-investors-corner',
  templateUrl: './investors-corner.component.html',
  styleUrls: ['./investors-corner.component.scss']
})
export class InvestorsCornerComponent implements OnInit {
  cars$: Observable<any>;
  transactionDetails$:Observable<any>;
  transactionDetailsForm: FormGroup;
  investors=[];
  expenses=[];
  transactionDetails=[];
  investorsExpensesAndPercent$:Observable<any>;
  investorsDetails = new Array();

  constructor(private fb: FormBuilder,
    private carService:CarService,
    private transactionDetailsService:TransactionDetailsService,
  private clientService:ClientService) { }

    ngOnInit() {
      this.createForm();
      this.getTransactionDetailsById();
      this.getCars();
    }
    createForm() {
      this.transactionDetailsForm = this.fb.group({
        car_records : this.fb.array([
          this.fb.group({
            car_id:[],

            investor_records : this.fb.array([
              this.fb.group({
                investor_id:[],
              }),
            ]),
          }),



        ]), // here
      });

    }

    getCars()  {
      this.carService.getCars().subscribe(
        res=>{
          this.cars$ = res;

          // this.cars$.forEach(car=>{
          //
          //   // this.clientService.getInvestorsExpensesAndPercent(car.car_id)
          //   // .subscribe(res => {
          //   //   this.investorsExpensesAndPercent$ = res;
          //   //   this.investorsExpensesAndPercent$.forEach(rec=>{
          //   //     this.investorsDetails.push(rec);
          //   //   })
          //
          // });
          //
          // console.log("moly ",this.investorsExpensesAndPercent);
        //});
          // let control = <FormArray>this.transactionDetailsForm.get('car_records');
          // this.cars$.forEach(car=>{
          //   this.investors = this.transactionDetails.filter(s => s.transaction_type_id == 1 && s.car_id == car.car_id);
          //   this.expenses = this.transactionDetails.filter(s => s.transaction_type_id == 2 && s.car_id == car.car_id);
          //
          //   control.push(this.fb.group({car_id:car.car_id, investor_records:this.investors, expense_records:this.expenses}));
          //   console.log("aa ",this.transactionDetailsForm.value);
          // })
        },
        err=>{

        }
      );
    }

    getTransactionDetailsById(){
      this.transactionDetailsService.getTransactionDetails().subscribe(
        res=>{
          this.transactionDetails = res;
        //  this.getCars();
        },
        err=>{

        });
      }
    }
