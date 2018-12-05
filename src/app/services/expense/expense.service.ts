import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
let environment = require('../../../environments/environment');
import { Expense } from '../../data-model';
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
export class ExpenseService {
  private apiUrl = environment.API_URL;
  selectedExpenseId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/expenses', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getExpenseById(expense_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/expenses/'+expense_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchExpenses(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/expenses/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createExpense(newExpense:Expense): Observable<any> {
    const body = JSON.stringify(newExpense);

    return this.http.post(this.apiUrl+'/api/expenses', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateExpense(editExpense:Expense): Observable<any> {
    const body = JSON.stringify(editExpense);
    const expense_id = editExpense.expense_id;

    return this.http.put("http://localhost:3000/api/expenses/"+expense_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteExpense(expense_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/expenses/'+expense_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
