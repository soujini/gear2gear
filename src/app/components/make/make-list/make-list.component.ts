import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import { Router,ActivatedRoute } from '@angular/router';


import { Make } from 'app/data-model';
import { MakeService } from 'app/services/make.service';

@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.scss']
})
export class MakeListComponent implements OnInit {
  public results$: Observable<Make>;
  createMode:boolean=false;
  //public create: boolean =false;

  constructor(private makeService:MakeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
      this.getMakes();
  }

  getMakes()  {
    this.results$ = this.makeService.getMakes();
  }

  searchMakes(searchTerm){
    if(searchTerm){
      this.results$ = this.makeService.searchMakes(searchTerm);
    }
    else{
      this.results$ = new EmptyObservable();
    }
  }
  createMakes(isCreate){
     //this.router.navigate(['/make/add']);
   //this.router.navigate([{ outlets: {'add':['add']} }], {relativeTo: this.route, skipLocationChange: true});
this.router.navigate(['/make/add']);
    // this.createMode=true;
  }
}
