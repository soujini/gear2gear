import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from '../../data-model';
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
export class CommonService {


  constructor(private http:HttpClient) {
  }

  // public getStates(): Observable<any> {
  //   //return this.http.get('http://services.groupkt.com/state/get/IND/all',{headers: {'Content-Type': 'application/json; charset=utf-8'}});
  // }
}
