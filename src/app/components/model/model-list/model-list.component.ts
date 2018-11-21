import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Model } from 'app/data-model';
import { ModelService } from 'app/services/model/model.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  @Input()
  results$: Observable<Model>;

  @Output()
  searchTerm = new EventEmitter();

  selectedModelId:number;

  constructor(private modelService:ModelService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/model/add']);
  }

  searchModels(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createModel(mode:any){
    this.modelService.selectedMode = mode;
    this.router.navigate(['/model/add']);
  }

  //On Click of the Edit Button
  selectModel(model_id:number, mode:any){
    this.selectedModelId=model_id;
    this.modelService.selectedMode = mode;
    this.router.navigate(['/model/edit']);
    setTimeout(() => {
      this.modelService.selectedModelId.next(model_id);
    }, 100);
  }

}
