import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Make } from 'app/data-model';
import { MakeService } from 'app/services/make/make.service';

@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.scss']
})
export class MakeListComponent implements OnInit {
  @Input()
  results$: Observable<Make>;

  @Output()
  searchTerm = new EventEmitter();

  constructor(private makeService:MakeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/make/add']);
  }

  searchMakes(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createMake(mode:any){
    this.makeService.selectedMode = mode;
    this.router.navigate(['/make/add']);
  }

  //On Click of the Edit Button
  selectMake(make_id:number, mode:any){
    this.makeService.selectedMode = mode;
    this.router.navigate(['/make/edit']);
    setTimeout(() => {
      this.makeService.selectedMakeId.next(make_id);
    }, 100);
  }

}
