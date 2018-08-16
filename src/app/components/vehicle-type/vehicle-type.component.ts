import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleType } from 'app/data-model';
import { VehicleTypeService } from 'app/services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-make',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {
  title : string = "Vehicle Type";
  selectedVehicleType : VehicleType;

  vehicleTypes$: Observable<VehicleType>;

  constructor(private fb: FormBuilder, private vehicleTypeService:VehicleTypeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getVehicleTypes();
    this.vehicleTypeService.refreshList.subscribe(
      res=>{
          this.getVehicleTypes();
      },
      err => {
        console.log(err);
      }
    );
  }

  getVehicleTypes()  {
    this.vehicleTypes$ = this.vehicleTypeService.getVehicleTypes();
  }

  searchVehicleTypes(searchTerm){
    if(searchTerm){
      this.vehicleTypes$ = this.vehicleTypeService.searchVehicleTypes(searchTerm);
    }
    else{
      this.vehicleTypes$ = new EmptyObservable();
    }
  }

}
