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
  cars:any=[];
  transactionDetails$:Observable<any>;
  transactionDetailsForm: FormGroup;
  investors=[];
  expenses=[];
  transactionDetails=[];
  investorsExpensesAndPercent$:Observable<any>;
  investorsDetails = new Array();
  available_balance:string;
  total_credits:string;
  total_debits:string;
  total_expenses:string="0";

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
      this.cars$.subscribe(
        res=>{
          this.cars=res;
        },
        err=>{

        });

      }

      getTransactionDetails(){
        this.transactionDetailsService.getTransactionDetails().subscribe(
          res=>{
            // this.transactionDetails = res.filter(elem => elem.is_void !== true);
            this.transactionDetails = res;
            this.cars$.subscribe(
              res1=>{
                for(var i=0;i<res1.length;i++)
                {
                  this.total_expenses="0";
                  for(var j =0; j<res.length;j++)
                  {
                    if(res[j].is_void != true){
                    if(res[j].car_id != null){
                      if(res1[i].car_id == res[j].car_id && res[j].transaction_type_id == 2)
                      {
                        this.total_expenses= (parseFloat(this.total_expenses) + parseFloat(res[j].debit)).toString();
                        this.cars[i].total_cost = parseFloat(res1[i].cost_price) + parseFloat(this.total_expenses);
                      }
                    }
                  }
                  }
                }
              },
              err=>{

              }
            );
            // for(var i=0;i<res.length;i++){
            //   if(res[i].transaction_type_id == 2){//Expenses
            //     this.total_expenses = this.total_expenses + parseInt(res[i].debit);
            //     console.log(this.total_expenses);
            //   }
            // }
            //  this.getCars();
          },
          err=>{

          });
        }

        formatCurrency(val){
          var isValid = /^[0-9,.]*$/.test(val);
          if(isValid == true)
          {
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
            return res;
          }
          else{
            return "";
          }
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
              this.available_balance = this.formatCurrency(res[0].available_balance);
              this.total_credits = this.formatCurrency(res[0].total_credits);
              this.total_debits = this.formatCurrency(res[0].total_debits);
            },
            err => {
              console.log("Get Available Pool Balance ",err);
            },
            () =>{

            }
          );
        }
      }
