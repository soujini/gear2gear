import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Color } from 'app/data-model';
import { ColorService } from 'app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  title : string = "Color";
  selectedColor : Color;

  colors$: Observable<Color>;

  constructor(private fb: FormBuilder, private colorService:ColorService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getColors();
    this.colorService.refreshList.subscribe(
      res=>{
          this.getColors();
      },
      err => {
        console.log(err);
      }
    );
  }

  getColors()  {
    this.colors$ = this.colorService.getColors();
  }

  searchColors(searchTerm){
    if(searchTerm){
      this.colors$ = this.colorService.searchColors(searchTerm);
    }
    else{
      this.colors$ = new EmptyObservable();
    }
  }

}
