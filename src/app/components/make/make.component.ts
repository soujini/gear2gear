import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Make } from 'app/data-model';
import { MakeService } from 'app/services/make.service';


// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit {
  title:string = "Make";
  makeForm: FormGroup;
  makes: Make[] = [];
  selectedMake: Make;
  public results$: Observable<Make>;

  constructor(private fb: FormBuilder, private makeService:MakeService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.makeForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }

  ngOnInit() {
// this.router.navigate(["list"], { relativeTo: this.route },{skipLocationChange:true});
//this.router.navigate([{ outlets: {'/list':['list']} }], {relativeTo: this.route, skipLocationChange: true});
// this.router.navigateByUrl('/make/list',{relativeTo: this.route});
    this.getMakes();
  }
  onSubmit(){
    if (this.makeForm.valid) {
      console.log("Form Submitted!");
      this.makeForm.reset();
    }
  }


  //private getIndexOfMake = (makeId: String) => {
  //   return this.makes.findIndex((make) => {
  //     return make._id === makeId;
  //   });
  // }

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

  // search(term:string): Obervable<SearchItem[]> {
  //   let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
  //   return this.http.get(apiURL)
  // }

  selectMake(make: Make) {
    this.selectedMake = make
  }

  createNewMake() {
    var make: Make = {
      name: '',
    };

    // By default, a newly-created make will have the selected state.
    this.selectMake(make);
  }

  deleteMake = (makeId: String) => {
    //  var idx = this.getIndexOfMake(makeId);
    // if (idx !== -1) {
    //   this.makes.splice(idx, 1);
    //   this.selectMake(null);
    // }
    return this.makes;
  }

  addMake = (make: Make) => {
    this.makes.push(make);
    this.selectMake(make);
    return this.makes;
  }

  // updateMake = (make: Make) => {
  //   var idx = this.getIndexOfMake(make._id);
  //   if (idx !== -1) {
  //     this.makes[idx] = make;
  //     this.selectMake(make);
  //   }
  //   return this.makes;
  // }

}
