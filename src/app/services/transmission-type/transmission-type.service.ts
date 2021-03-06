import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
let environment = require('../../../environments/environment');
import { TransmissionType } from '../../data-model';
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
export class TransmissionTypeService {
  private apiUrl = environment.API_URL;
  selectedTransmissionTypeId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getTransmissionTypes(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/transmissionTypes', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getTransmissionTypeById(transmission_type_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/transmissionTypes/'+transmission_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchTransmissionTypes(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/transmissionTypes/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createTransmissionType(newTransmissionType:TransmissionType): Observable<any> {
    const body = JSON.stringify(newTransmissionType);

    return this.http.post(this.apiUrl+'/api/transmissionTypes', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateTransmissionType(editTransmissionType:TransmissionType): Observable<any> {
    const body = JSON.stringify(editTransmissionType);
    const transmission_type_id = editTransmissionType.transmission_type_id;

    return this.http.put("http://localhost:3000/api/transmissionTypes/"+transmission_type_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteTransmissionType(transmission_type_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/transmissionTypes/'+transmission_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
