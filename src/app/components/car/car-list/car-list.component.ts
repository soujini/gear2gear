import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Car } from 'app/data-model';
import { CarService } from 'app/services/car/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  @Input()
  results$: Observable<Car>;

  @Output()
  searchTerm = new EventEmitter();

  constructor(private carService:CarService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/car/add']);
  }

  searchCars(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createCar(mode:any){
    this.carService.selectedMode = mode;
    this.router.navigate(['/car/add']);
  }

  //On Click of the Edit Button
  selectCar(car_id:number, mode:any){
    this.carService.selectedMode = mode;
    this.router.navigate(['/car/edit']);
    setTimeout(() => {
      this.carService.selectedCarId.next(car_id);
    }, 100);
  }

}
