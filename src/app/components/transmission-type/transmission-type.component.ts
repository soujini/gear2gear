import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { TransmissionType } from 'app/data-model';
import { TransmissionTypeService } from 'app/services/transmission-type/transmission-type.service';

@Component({
  selector: 'app-make',
  templateUrl: './transmission-type.component.html',
  styleUrls: ['./transmission-type.component.scss']
})
export class TransmissionTypeComponent implements OnInit {
  title : string = "Transmission Type";
  selectedTransmissionType : TransmissionType;

  transmissionTypes$: Observable<TransmissionType>;

  constructor(private fb: FormBuilder, private transmissionTypeService:TransmissionTypeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getTransmissionTypes();
    this.transmissionTypeService.refreshList.subscribe(
      res=>{
          this.getTransmissionTypes();
      },
      err => {
        console.log(err);
      }
    );
  }

  getTransmissionTypes()  {
    this.transmissionTypes$ = this.transmissionTypeService.getTransmissionTypes();
  }

  searchTransmissionTypes(searchTerm){
    if(searchTerm){
      this.transmissionTypes$ = this.transmissionTypeService.searchTransmissionTypes(searchTerm);
    }
    else{
      this.transmissionTypes$ = new EmptyObservable();
    }
  }

}
