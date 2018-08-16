import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Car } from 'app/data-model';
import { CarService } from 'app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  title : string = "Car";
  selectedCar : Car;

  cars$: Observable<Car>;

  constructor(private fb: FormBuilder, private carService:CarService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getCars();
    this.carService.refreshList.subscribe(
      res=>{
          this.getCars();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCars()  {
    this.cars$ = this.carService.getCars();
  }

  searchCars(searchTerm){
    if(searchTerm){
      this.cars$ = this.carService.searchCars(searchTerm);
    }
    else{
      this.cars$ = new EmptyObservable();
    }
  }

}
