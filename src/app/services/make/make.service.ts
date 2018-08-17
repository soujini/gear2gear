import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Make } from '../../data-model';
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
export class MakeService {
  private makesUrl = '/api/makes';
  private putUrl = '/api/makes';
  selectedMakeId :Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();

  constructor(private http:HttpClient) {
  }

  public getMakes(): Observable<any> {
    return this.http.get('https://gear2gear.herokuapp.com/api/makes', {headers: {'Content-Type': 'application/json; charset=utf-8'}});
    //.map(res => res);
  }

  public getMakeById(make_id:number): Observable<any> {
    return this.http.get('https://gear2gear.herokuapp.com/api/makes/'+make_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchMakes(searchTerm): Observable<any> {
    return this.http.get('https://gear2gear.herokuapp.com/api/makes/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createMake(newMake:Make): Observable<any> {
    const body = JSON.stringify(newMake);

    return this.http.post('https://gear2gear.herokuapp.com/api/makes', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateMake(editMake:Make): Observable<any> {
    const body = JSON.stringify(editMake);
    const make_id = editMake.make_id;

    return this.http.put("https://gear2gear.herokuapp.com/api/makes/"+make_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public deleteMake(make_id:number): Observable<any> {
    return this.http.delete('https://gear2gear.herokuapp.com/api/makes/'+make_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
