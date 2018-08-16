import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from '../../data-model';
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
export class CarService {
  private carsUrl = '/api/cars';
  private putUrl = '/api/cars';
  selectedCarId = new BehaviorSubject(0);
  sold:Subject<any> = new Subject();
  selectedMode :string = "Create";
  refreshList:Subject<any> = new Subject();
  transactionDetail = new BehaviorSubject("");

  constructor(private http:HttpClient) {
  }

  public getCars(): Observable<any> {
    return this.http.get('http://localhost:3000/api/cars', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getAvailableCars(): Observable<any> {
    return this.http.get('http://localhost:3000/api/available-cars', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }
  public getSoldCars(): Observable<any> {
    return this.http.get('http://localhost:3000/api/sold-cars', {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public getCarById(car_id:number): Observable<any> {
    return this.http.get('http://localhost:3000/api/cars/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public searchCars(searchTerm): Observable<any> {
    return this.http.get('http://localhost:3000/api/cars/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public createCar(newCar:Car): Observable<any> {
    const body = JSON.stringify(newCar);

    return this.http.post('http://localhost:3000/api/cars', body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateCar(editCar:Car): Observable<any> {
    const body = JSON.stringify(editCar);
    const car_id = editCar.car_id;

    return this.http.put("http://localhost:3000/api/cars/"+car_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .map(res => res);
  }

  public updateTotalCost(car:any) {
    const body = JSON.stringify(car);
    const car_id = car.car_id;
    return this.http.patch('http://localhost:3000/api/cars/'+car_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .subscribe(
      res => {
      console.log("asdadsada", res);
    },
    err => {
       console.log("error here", err);
    },
    () => {
      console.log("Completed");
    }
  );
  }

  public updateTotalIncome(car:any) {
    const body = JSON.stringify(car);
    const car_id = car.car_id;
    return this.http.patch('http://localhost:3000/api/cars/income/'+car_id, body, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    .subscribe(
      res => {
      console.log("Total Income of the car is Updated", res);
    },
    err => {
       console.log("error here", err);
    },
    () => {
      console.log("Completed");
    }
  );
  }

  public deleteCar(car_id:number): Observable<any> {
    return this.http.delete('http://localhost:3000/api/cars/'+car_id, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
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
