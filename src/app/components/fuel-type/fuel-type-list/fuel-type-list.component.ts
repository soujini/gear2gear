import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { FuelType } from 'app/data-model';
import { FuelTypeService } from 'app/services/fuel-type/fuel-type.service';

@Component({
  selector: 'app-fuelType-list',
  templateUrl: './fuel-type-list.component.html',
  styleUrls: ['./fuel-type-list.component.scss']
})
export class FuelTypeListComponent implements OnInit {
  @Input()
  results$: Observable<FuelType>;

  @Output()
  searchTerm = new EventEmitter();

  constructor(private fuelTypeService:FuelTypeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/fuelType/add']);
  }

  searchFuelTypes(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createFuelType(mode:any){
    this.fuelTypeService.selectedMode = mode;
    this.router.navigate(['/fuelType/add']);
  }

  //On Click of the Edit Button
  selectFuelType(fuelType_id:number, mode:any){
    this.fuelTypeService.selectedMode = mode;
    this.router.navigate(['/fuelType/edit']);
    setTimeout(() => {
      this.fuelTypeService.selectedFuelTypeId.next(fuelType_id);
    }, 100);
  }

}
