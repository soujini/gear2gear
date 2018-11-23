import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { TransmissionType } from 'app/data-model';
import { TransmissionTypeService } from 'app/services/transmission-type/transmission-type.service';

@Component({
  selector: 'app-transmissionType-list',
  templateUrl: './transmission-type-list.component.html',
  styleUrls: ['./transmission-type-list.component.scss']
})
export class TransmissionTypeListComponent implements OnInit {
  @Input()
  results$: Observable<TransmissionType>;

  @Output()
  searchTerm = new EventEmitter();

  selectedTransmissionTypeId:number;

  constructor(private transmissionTypeService:TransmissionTypeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/transmissionType/add']);
  }

  searchTransmissionTypes(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createTransmissionType(mode:any){
    this.selectedTransmissionTypeId=0;
    this.transmissionTypeService.selectedMode = mode;
    this.router.navigate(['/transmissionType/add']);
  }

  //On Click of the Edit Button
  selectTransmissionType(transmissionType_id:number, mode:any){
    this.selectedTransmissionTypeId=transmissionType_id;
    this.transmissionTypeService.selectedMode = mode;
    this.router.navigate(['/transmissionType/edit']);
    setTimeout(() => {
      this.transmissionTypeService.selectedTransmissionTypeId.next(transmissionType_id);
    }, 100);
  }

}
