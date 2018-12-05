import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
let environment = require('../../../environments/environment');
import { Insurance } from '../../data-model';
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
export class InsuranceService {
  private apiUrl = environment.API_URL;
  selectedInsuranceId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getInsurances(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/insurances', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getInsuranceById(insurance_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/insurances/'+insurance_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchInsurances(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/insurances/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createInsurance(newInsurance:Insurance): Observable<any> {
    const body = JSON.stringify(newInsurance);

    return this.http.post(this.apiUrl+'/api/insurances', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateInsurance(editInsurance:Insurance): Observable<any> {
    const body = JSON.stringify(editInsurance);
    const insurance_id = editInsurance.insurance_id;

    return this.http.put("http://localhost:3000/api/insurances/"+insurance_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteInsurance(insurance_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/insurances/'+insurance_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
