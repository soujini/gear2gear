import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Make } from 'app/data-model';
import { MakeService } from 'app/services/make/make.service';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit {
  title : string = "Make";
  selectedMake : Make;

  makes$: Observable<Make>;

  constructor(private fb: FormBuilder, private makeService:MakeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getMakes();
    this.makeService.refreshList.subscribe(
      res=>{
          this.getMakes();
      },
      err => {
        console.log(err);
      }
    );
  }

  getMakes()  {
    this.makes$ = this.makeService.getMakes();
  }

  searchMakes(searchTerm){
    if(searchTerm){
      this.makes$ = this.makeService.searchMakes(searchTerm);
    }
    else{
      this.makes$ = new EmptyObservable();
    }
  }

}
