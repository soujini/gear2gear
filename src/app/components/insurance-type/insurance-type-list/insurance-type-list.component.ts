import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { InsuranceType } from 'app/data-model';
import { InsuranceTypeService } from 'app/services/insurance-type/insurance-type.service';

@Component({
  selector: 'app-insuranceType-list',
  templateUrl: './insurance-type-list.component.html',
  styleUrls: ['./insurance-type-list.component.scss']
})
export class InsuranceTypeListComponent implements OnInit {
  @Input()
  results$: Observable<InsuranceType>;

  @Output()
  searchTerm = new EventEmitter();

  constructor(private insuranceTypeService:InsuranceTypeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/insuranceType/add']);
  }

  searchInsuranceTypes(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createInsuranceType(mode:any){
    this.insuranceTypeService.selectedMode = mode;
    this.router.navigate(['/insuranceType/add']);
  }

  //On Click of the Edit Button
  selectInsuranceType(insuranceType_id:number, mode:any){
    this.insuranceTypeService.selectedMode = mode;
    this.router.navigate(['/insuranceType/edit']);
    setTimeout(() => {
      this.insuranceTypeService.selectedInsuranceTypeId.next(insuranceType_id);
    }, 100);
  }

}
