import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
let environment = require('../../../environments/environment');
import { Variant } from '../../data-model';
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
export class VariantService {
  private apiUrl = environment.API_URL;
  selectedVariantId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getVariants(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/variants', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getVariantById(variant_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/variants/'+variant_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchVariants(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/variants/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createVariant(newVariant:Variant): Observable<any> {
    const body = JSON.stringify(newVariant);

    return this.http.post(this.apiUrl+'/api/variants', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateVariant(editVariant:Variant): Observable<any> {
    const body = JSON.stringify(editVariant);
    const variant_id = editVariant.variant_id;

    return this.http.put("http://localhost:3000/api/variants/"+variant_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteVariant(variant_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/variants/'+variant_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
