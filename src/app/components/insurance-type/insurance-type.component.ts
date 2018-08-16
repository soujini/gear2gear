import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { InsuranceType } from 'app/data-model';
import { InsuranceTypeService } from 'app/services/insurance-type/insurance-type.service';

@Component({
  selector: 'app-make',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.scss']
})
export class InsuranceTypeComponent implements OnInit {
  title : string = "Insurance Type";
  selectedInsuranceType : InsuranceType;

  insuranceTypes$: Observable<InsuranceType>;

  constructor(private fb: FormBuilder, private insuranceTypeService:InsuranceTypeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getInsuranceTypes();
    this.insuranceTypeService.refreshList.subscribe(
      res=>{
          this.getInsuranceTypes();
      },
      err => {
        console.log(err);
      }
    );
  }

  getInsuranceTypes()  {
    this.insuranceTypes$ = this.insuranceTypeService.getInsuranceTypes();
  }

  searchInsuranceTypes(searchTerm){
    if(searchTerm){
      this.insuranceTypes$ = this.insuranceTypeService.searchInsuranceTypes(searchTerm);
    }
    else{
      this.insuranceTypes$ = new EmptyObservable();
    }
  }

}
