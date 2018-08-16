import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TransactionType } from '../../data-model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: { 'Content-Type': 'application/json' }
};


@Injectable()
export class TransactionTypeService {
  private transactionTypesUrl = '/api/transactionTypes';
  private putUrl = '/api/transactionTypes';
  selectedTransactionTypeId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getTransactionTypes(): Observable<any> {
    return this.http.get('http://localhost:3000/api/transactionTypes', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getTransactionTypeById(transaction_type_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/transactionTypes/'+transaction_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchTransactionTypes(searchTerm): Observable<any> {
    return this.http.get('http://localhost:3000/api/transactionTypes/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createTransactionType(newTransactionType:TransactionType): Observable<any> {
    const body = JSON.stringify(newTransactionType);

    return this.http.post('http://localhost:3000/api/transactionTypes', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateTransactionType(editTransactionType:TransactionType): Observable<any> {
    const body = JSON.stringify(editTransactionType);
    const transaction_type_id = editTransactionType.transaction_type_id;

    return this.http.put("http://localhost:3000/api/transactionTypes/"+transaction_type_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteTransactionType(transaction_type_id:number): Observable<any> {
    return this.http.delete('http://localhost:3000/api/transactionTypes/'+transaction_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
