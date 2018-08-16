import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from '../../data-model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: { 'Content-Type': 'application/json' }
};


@Injectable()
export class ClientService {
  private clientsUrl = '/api/clients';
  private putUrl = '/api/clients';
  selectedClientId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();
  states$: Observable<any>;

  constructor(private http:HttpClient) {
  }

  public getClients(): Observable<any> {
    return this.http.get('http://localhost:3000/api/clients', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getInvestors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/investors', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getInvestorsExpensesAndPercent(car_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/investors/investorsExpensesAndPercent/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getAvailableBalance(investor_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/investors/'+investor_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateAvailableBalance(investor:any) {
    const body = JSON.stringify(investor);
    const investor_id = investor.investor_id;
    return this.http.patch('http://localhost:3000/api/clients/'+investor_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .subscribe(
      res => {
      console.log("Available Balance for the client is updated", res);
    },
    err => {
       console.log("Error ", err);
    },
    () => {
      console.log("Completed");
    }
  );
  }

  public updateTotalExpenses(investor:any) {
    const body = JSON.stringify(investor);
    const investor_id = investor.investor_id;
    return this.http.patch('http://localhost:3000/api/clients/expenses/'+investor_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .subscribe(
      res => {
      console.log("Total Expenses for the client is updated : ", res);
    },
    err => {
       console.log("Error ", err);
    },
    () => {
      console.log("Completed");
    }
  );
  }

  public getClientById(client_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/clients/'+client_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchClients(searchTerm): Observable<any> {
    return this.http.get('http://localhost:3000/api/clients/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createClient(newClient:Client): Observable<any> {
    const body = JSON.stringify(newClient);

    return this.http.post('http://localhost:3000/api/clients', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateClient(editClient:Client): Observable<any> {
    const body = JSON.stringify(editClient);
    const client_id = editClient.client_id;

    return this.http.put('http://localhost:3000/api/clients/'+client_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteClient(client_id:number): Observable<any> {
    return this.http.delete('http://localhost:3000/api/clients/'+client_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
