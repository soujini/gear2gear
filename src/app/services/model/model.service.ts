import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
let environment = require('../../../environments/environment');
import { Model } from '../../data-model';
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
export class ModelService {
  private apiUrl = environment.API_URL;
  selectedModelId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getModels(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/models', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
   .map(res => res);
  }

  public getModelById(model_id:number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/models/'+model_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchModels(searchTerm): Observable<any> {
    return this.http.get(this.apiUrl+'/api/models/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createModel(newModel:Model): Observable<any> {
    const body = JSON.stringify(newModel);

    return this.http.post(this.apiUrl+'/api/models', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateModel(editModel:Model): Observable<any> {
    const body = JSON.stringify(editModel);
    const model_id = editModel.model_id;

    return this.http.put("http://localhost:3000/api/models/"+model_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteModel(model_id:number): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/models/'+model_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
