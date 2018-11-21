import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Insurance } from 'app/data-model';
import { InsuranceService } from 'app/services/insurance/insurance.service';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {
  @Input()
  results$: Observable<Insurance>;

  @Output()
  searchTerm = new EventEmitter();

  selectedInsuranceId:number;

  constructor(private insuranceService:InsuranceService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/insurance/add']);
  }

  searchInsurances(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createInsurance(mode:any){
    this.insuranceService.selectedMode = mode;
    this.router.navigate(['/insurance/add']);
  }

  //On Click of the Edit Button
  selectInsurance(insurance_id:number, mode:any){
    this.selectedInsuranceId=insurance_id;
    this.insuranceService.selectedMode = mode;
    this.router.navigate(['/insurance/edit']);
    setTimeout(() => {
      this.insuranceService.selectedInsuranceId.next(insurance_id);
    }, 100);
  }

}
