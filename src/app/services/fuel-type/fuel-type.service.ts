import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { FuelType } from '../../data-model';
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
export class FuelTypeService {
  private apiUrl = environment.API_URL;
  selectedFuelTypeId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getFuelTypes(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/fuelTypes', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getFuelTypeById(fuel_type_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/fuelTypes/'+fuel_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchFuelTypes(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/fuelTypes/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createFuelType(newFuelType:FuelType): Observable<any> {
    const body = JSON.stringify(newFuelType);

    return this.http.post(this.apiUrl+'/api/fuelTypes', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateFuelType(editFuelType:FuelType): Observable<any> {
    const body = JSON.stringify(editFuelType);
    const fuel_type_id = editFuelType.fuel_type_id;

    return this.http.put("http://localhost:3000/api/fuelTypes/"+fuel_type_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteFuelType(fuel_type_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/fuelTypes/'+fuel_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
