import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TransactionDetails } from '../../data-model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: { 'Content-Type': 'application/json' }
};

@Injectable()
export class TransactionDetailsService {
  private transactionDetailsUrl = '/api/transactionDetails';
  private putUrl = '/api/transactionDetails';
  selectedTransactionDetailsId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getTransactionDetails(): Observable<any> {
    return this.http.get('http://localhost:3000/api/transactionDetails', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getTransactionDetailsById(transaction_details_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/transactionDetails/'+transaction_details_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getTotalInvestmentAndBalanceByCar(car_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/transactionDetails/totalInvestmentBalance/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  // public searchTransactionDetailss(searchTerm): Observable<any> {
  //   return this.http.get('http://localhost:3000/api/transactionDetails/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
  //   .map(res => res);
  // }

   public createTransactionDetails(newTransactionDetails:TransactionDetails): Observable<any> {
     console.log(newTransactionDetails);
     const body = JSON.stringify(newTransactionDetails);
     return this.http.post('http://localhost:3000/api/transactionDetails',body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
     .map(res => res);
   }
   public createTransactionDetailsProfitAndLoss(newTransactionDetails:any): Observable<any> {
    const body = JSON.stringify(newTransactionDetails);
     return this.http.post('http://localhost:3000/api/transactionDetails/profitAndLoss',body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
     .map(res => res);
   }

  public updateTransactionDetails(editTransactionDetails:TransactionDetails): Observable<any> {
    const body = JSON.stringify(editTransactionDetails);
    const transaction_details_id = editTransactionDetails.transaction_details_id;

    return this.http.put("http://localhost:3000/api/transactionDetails/"+transaction_details_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteTransactionDetails(transaction_details_id:number): Observable<any> {
    return this.http.delete('http://localhost:3000/api/transactionDetails/'+transaction_details_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public deleteProfitOrLossTransactionDetails(car_id:number, investorsExpensesAndPercent:any): Observable<any> {
    const investorsDetails = JSON.stringify(investorsExpensesAndPercent);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      body: investorsDetails,
    };

    return this.http.delete('http://localhost:3000/api/transactionDetails/deleteProfitOrLoss/'+car_id, options)
    .map(res => res);
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
