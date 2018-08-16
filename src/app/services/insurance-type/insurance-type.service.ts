import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InsuranceType } from '../../data-model';
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
export class InsuranceTypeService {
  private insuranceTypesUrl = '/api/insuranceTypes';
  private putUrl = '/api/insuranceTypes';
  selectedInsuranceTypeId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getInsuranceTypes(): Observable<any> {
    return this.http.get('http://localhost:3000/api/insuranceTypes', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getInsuranceTypeById(insurance_type_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/insuranceTypes/'+insurance_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchInsuranceTypes(searchTerm): Observable<any> {
    return this.http.get('http://localhost:3000/api/insuranceTypes/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createInsuranceType(newInsuranceType:InsuranceType): Observable<any> {
    const body = JSON.stringify(newInsuranceType);

    return this.http.post('http://localhost:3000/api/insuranceTypes', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateInsuranceType(editInsuranceType:InsuranceType): Observable<any> {
    const body = JSON.stringify(editInsuranceType);
    const insurance_type_id = editInsuranceType.insurance_type_id;

    return this.http.put("http://localhost:3000/api/insuranceTypes/"+insurance_type_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteInsuranceType(insurance_type_id:number): Observable<any> {
    return this.http.delete('http://localhost:3000/api/insuranceTypes/'+insurance_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
