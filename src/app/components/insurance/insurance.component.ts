import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Insurance } from 'app/data-model';
import { InsuranceService } from 'app/services/insurance/insurance.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  title : string = "Insurance";
  selectedInsurance : Insurance;

  insurances$: Observable<Insurance>;

  constructor(private fb: FormBuilder, private insuranceService:InsuranceService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getInsurances();
    this.insuranceService.refreshList.subscribe(
      res=>{
          this.getInsurances();
      },
      err => {
        console.log(err);
      }
    );
  }

  getInsurances()  {
    this.insurances$ = this.insuranceService.getInsurances();
  }

  searchInsurances(searchTerm){
    if(searchTerm){
      this.insurances$ = this.insuranceService.searchInsurances(searchTerm);
    }
    else{
      this.insurances$ = new EmptyObservable();
    }
  }

}
