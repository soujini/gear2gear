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
  available_balance:string;

  constructor(private fb: FormBuilder,
    private carService:CarService,
    private transactionDetailsService:TransactionDetailsService,
    private clientService:ClientService) { }

    ngOnInit() {
      this.createForm();
      this.getTransactionDetails();
      this.getCars();
      this.getAvailablePoolBalanceAsOfPurchaseDate();
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
        ]),
      });

    }

    getCars()  {
      this.cars$ = this.carService.getCars();

    }

    getTransactionDetails(){
      this.transactionDetailsService.getTransactionDetails().subscribe(
        res=>{
          this.transactionDetails = res;
          console.log(res);
          //  this.getCars();
        },
        err=>{

        });
      }


    getAvailablePoolBalanceAsOfPurchaseDate()
    {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      var formattedDate = yyyy+"-"+mm+"-"+dd;
      this.transactionDetailsService.getAvailablePoolBalanceAsOfPurchaseDate(formattedDate)
      .subscribe(
        res => {
          this.available_balance = res[0].available_balance;
        },
        err => {
          console.log("Get Available Pool Balance ",err);
        },
        () =>{

        }
      );
    }
  }
