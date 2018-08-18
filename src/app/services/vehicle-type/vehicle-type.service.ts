import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { VehicleType } from '../../data-model';
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
export class VehicleTypeService {
  private apiUrl = environment.API_URL;
  selectedVehicleTypeId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getVehicleTypes(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/vehicleTypes', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getVehicleTypeById(vehicle_type_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/vehicleTypes/'+vehicle_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchVehicleTypes(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/vehicleTypes/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createVehicleType(newVehicleType:VehicleType): Observable<any> {
    const body = JSON.stringify(newVehicleType);

    return this.http.post(this.apiUrl+'/api/vehicleTypes', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateVehicleType(editVehicleType:VehicleType): Observable<any> {
    const body = JSON.stringify(editVehicleType);
    const vehicle_type_id = editVehicleType.vehicle_type_id;

    return this.http.put("http://localhost:3000/api/vehicleTypes/"+vehicle_type_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteVehicleType(vehicle_type_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/vehicleTypes/'+vehicle_type_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
