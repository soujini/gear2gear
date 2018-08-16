import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Car } from 'app/data-model';
import { CarService } from 'app/services/car/car.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  title : string = "Available Cars";
  cars$: Observable<Car>;

  constructor(public carService:CarService) { }

  ngOnInit() {
    this.getAvailableCars();
  }
  getAvailableCars()  {
    this.cars$ = this.carService.getAvailableCars();
    this.cars$.subscribe(res=>{
      console.log("asdajhdkjashdka");
    },
  err=>{
    console.log("rwoierwoieruworuoweurowurowruoweiurowieuroweiru ",err);
  })
  }

}
