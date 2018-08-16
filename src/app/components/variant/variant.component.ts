import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Variant } from 'app/data-model';
import { VariantService } from 'app/services/variant/variant.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {
  title : string = "Variant";
  selectedVariant : Variant;

  variants$: Observable<Variant>;

  constructor(private fb: FormBuilder, private variantService:VariantService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getVariants();
    this.variantService.refreshList.subscribe(
      res=>{
          this.getVariants();
      },
      err => {
        console.log(err);
      }
    );
  }

  getVariants()  {
    this.variants$ = this.variantService.getVariants();
  }

  searchVariants(searchTerm){
    if(searchTerm){
      this.variants$ = this.variantService.searchVariants(searchTerm);
    }
    else{
      this.variants$ = new EmptyObservable();
    }
  }

}
