import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Model } from 'app/data-model';
import { ModelService } from 'app/services/model/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  title : string = "Model";
  selectedModel : Model;

  models$: Observable<Model>;

  constructor(private fb: FormBuilder, private modelService:ModelService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getModels();
    this.modelService.refreshList.subscribe(
      res=>{
          this.getModels();
      },
      err => {
        console.log(err);
      }
    );
  }

  getModels()  {
    this.models$ = this.modelService.getModels();
  }

  searchModels(searchTerm){
    if(searchTerm){
      this.models$ = this.modelService.searchModels(searchTerm);
    }
    else{
      this.models$ = new EmptyObservable();
    }
  }

}
