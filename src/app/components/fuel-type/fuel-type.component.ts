import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { FuelType } from 'app/data-model';
import { FuelTypeService } from 'app/services/fuel-type/fuel-type.service';

@Component({
  selector: 'app-make',
  templateUrl: './fuel-type.component.html',
  styleUrls: ['./fuel-type.component.scss']
})
export class FuelTypeComponent implements OnInit {
  title : string = "Fuel Type";
  selectedFuelType : FuelType;

  fuelTypes$: Observable<FuelType>;

  constructor(private fb: FormBuilder, private fuelTypeService:FuelTypeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getFuelTypes();
    this.fuelTypeService.refreshList.subscribe(
      res=>{
          this.getFuelTypes();
      },
      err => {
        console.log(err);
      }
    );
  }

  getFuelTypes()  {
    this.fuelTypes$ = this.fuelTypeService.getFuelTypes();
  }

  searchFuelTypes(searchTerm){
    if(searchTerm){
      this.fuelTypes$ = this.fuelTypeService.searchFuelTypes(searchTerm);
    }
    else{
      this.getFuelTypes();
      //this.fuelTypes$ = new EmptyObservable();
    }
  }

}
