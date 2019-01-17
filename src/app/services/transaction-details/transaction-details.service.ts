import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
let environment = require('../../../environments/environment');
import { TransactionDetails } from '../../data-model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import "rxjs/add/operator/debounceTime";

const httpOptions = {
  headers: { 'Content-Type': 'application/json' }
};

@Injectable()
export class TransactionDetailsService {
  private apiUrl = environment.API_URL;
  selectedTransactionDetailsId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();
  refreshTD:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getAvailablePoolBalanceAsOfPurchaseDate(purchaseDate:string):Observable<any>{
    return this.http.get(this.apiUrl+'/api/transactionDetails/availablePoolBalance/'+purchaseDate, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getTransactionDetails(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/transactionDetails', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public GetInvestorsInvestmentAndPercentDetailsByPurchaseDate(purchaseDate:string): Observable<any> {
    return this.http.get(this.apiUrl+'/api/transactionDetails/investorsInvestmentDetails/'+purchaseDate, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getTransactionDetailsByInvestor(investor_id:number): Observable<any> {
    console.log("getting tran details by investor");
    return this.http.get<any[]>(this.apiUrl+'/api/transactionDetails/investor/'+investor_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(transaction =>
      {
        transaction.forEach(c => {
          if(c.debit != 0 && c.debit != null){
            c.debit_formatted = this.formatCurrencyByVal(c.debit);
          }
          if(c.credit != 0 && c.credit != null){
            c.credit_formatted = this.formatCurrencyByVal(c.credit);
          }
        });
        return transaction;
      });
    }

    public getTransactionDetailsById(car_id:number): Observable<any> {
      return this.http.get<any[]>(this.apiUrl+'/api/transactionDetails/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(transaction =>
        {
          transaction.forEach(c => {
            if(c.debit != 0 && c.debit != null){
              c.debit_formatted = this.formatCurrencyByVal(c.debit);
            }
            if(c.credit != 0 && c.credit != null){
              c.credit_formatted = this.formatCurrencyByVal(c.credit);
            }
          });
          return transaction;
        },
      err=>{
        console.log("Error getTransactionDetailsById ",err);
      });
    }
    public getAllTransactionDetailsById(car_id:number): Observable<any> {
      return this.http.get<any[]>(this.apiUrl+'/api/transactionDetails/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(transaction =>
        {
          transaction.forEach(c => {
            if(c.debit != 0 && c.debit != null){
              c.debit_formatted = this.formatCurrencyByVal(c.debit);
            }
            if(c.credit != 0 && c.credit != null){
              c.credit_formatted = this.formatCurrencyByVal(c.credit);
            }
          });
          return transaction;
        },
      err=>{
        console.log("Error getAllTransactionDetailsById ",err);
      });
    }
    // public getTotalInvestmentAndBalanceByCar(car_id:number): Observable<any> {
    //   return this.http.get(this.apiUrl+'/api/transactionDetails/totalInvestmentBalance/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    //   .map(res => res);
    // }
    public getTransactionDetailsBySoldTranType(car_id:number): Observable<any> {
      return this.http.get(this.apiUrl+'/api/transactionDetails/soldTranType/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }
    public getTransactionDetailsByPurchaseTranType(car_id:number): Observable<any> {
      return this.http.get(this.apiUrl+'/api/transactionDetails/purchaseTranType/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }

    // public searchTransactionDetailss(searchTerm): Observable<any> {
    //   return this.http.get(this.apiUrl+'/api/transactionDetails/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    //   .map(res => res);
    // }

    public createTransactionDetails(newTransactionDetails:TransactionDetails): Observable<any> {
      console.log(newTransactionDetails);
      const body = JSON.stringify(newTransactionDetails);
      return this.http.post(this.apiUrl+'/api/transactionDetails',body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }

    public createTransactionDetailsForClient(newTransactionDetails:TransactionDetails): Observable<any> {
      console.log(newTransactionDetails);
      const body = JSON.stringify(newTransactionDetails);
      return this.http.post(this.apiUrl+'/api/transactionDetails/client',body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }

    public createTransactionDetailsProfitAndLoss(newTransactionDetails:any): Observable<any> {
      const body = JSON.stringify(newTransactionDetails);
      return this.http.post(this.apiUrl+'/api/transactionDetails/profitAndLoss',body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }

    public updateTransactionDetails(editTransactionDetails:TransactionDetails): Observable<any> {
      const body = JSON.stringify(editTransactionDetails);
      const transaction_details_id = editTransactionDetails.transaction_details_id;

      return this.http.put(this.apiUrl+'/api/transactionDetails/'+transaction_details_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }
    public voidTransactionDetails(transactionDetails:TransactionDetails): Observable<any> {
      const body = JSON.stringify(transactionDetails);
      const transaction_details_id = transactionDetails.transaction_details_id;

      return this.http.put(this.apiUrl+'/api/transactionDetails/void/'+transaction_details_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }

    public deleteTransactionDetails(transaction_details_id:number): Observable<any> {
      return this.http.delete(this.apiUrl+'/api/transactionDetails/'+transaction_details_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }
    public deleteTransactionDetailsByTransactionType(transaction_type_id:number): Observable<any> {
      return this.http.delete(this.apiUrl+'/api/transactionDetails/transactionType/'+transaction_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }
    public deleteProfitOrLossTransactionDetails(car_id:number): Observable<any> {
      // const investorsDetails = JSON.stringify(investorsExpensesAndPercent);
      // let options = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json; charset=utf-8',
      //   }),
      //   body: investorsDetails,
      // };

      return this.http.delete(this.apiUrl+'/api/transactionDetails/deleteProfitOrLoss/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .map(res => res);
    }
    public formatCurrencyByVal(val){
      let val1 = ''+val;
      let x = val1.replace( /,/g, "" );
      var afterPoint = '';
      if(x.indexOf('.') > 0)
      afterPoint = x.substring(x.indexOf('.'),x.length);
      x = Math.floor(parseInt(x)).toString();
      //x=x.toString();
      var lastThree = x.substring(x.length-3);
      var otherNumbers = x.substring(0,x.length-3);
      if(otherNumbers != '')
      lastThree = ',' + lastThree;
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
      return res;
    }

    extractData(res: Response) {
      let body = res.json();
      return body || {};
    }

    handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.log(errMsg); // log to console instead
    }
  }
