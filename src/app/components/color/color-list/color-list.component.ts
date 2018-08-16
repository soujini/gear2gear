import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Color } from 'app/data-model';
import { ColorService } from 'app/services/color/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {
  @Input()
  results$: Observable<Color>;

  @Output()
  searchTerm = new EventEmitter();

  constructor(private colorService:ColorService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/color/add']);
  }

  searchColors(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createColor(mode:any){
    this.colorService.selectedMode = mode;
    this.router.navigate(['/color/add']);
  }

  //On Click of the Edit Button
  selectColor(color_id:number, mode:any){
    this.colorService.selectedMode = mode;
    this.router.navigate(['/color/edit']);
    setTimeout(() => {
      this.colorService.selectedColorId.next(color_id);
    }, 100);
  }

}
