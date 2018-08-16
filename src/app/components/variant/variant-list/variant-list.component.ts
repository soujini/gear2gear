import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Variant } from 'app/data-model';
import { VariantService } from 'app/services/variant/variant.service';

@Component({
  selector: 'app-variant-list',
  templateUrl: './variant-list.component.html',
  styleUrls: ['./variant-list.component.scss']
})
export class VariantListComponent implements OnInit {
  @Input()
  results$: Observable<Variant>;

  @Output()
  searchTerm = new EventEmitter();

  constructor(private variantService:VariantService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/variant/add']);
  }

  searchVariants(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createVariant(mode:any){
    this.variantService.selectedMode = mode;
    this.router.navigate(['/variant/add']);
  }

  //On Click of the Edit Button
  selectVariant(variant_id:number, mode:any){
    this.variantService.selectedMode = mode;
    this.router.navigate(['/variant/edit']);
    setTimeout(() => {
      this.variantService.selectedVariantId.next(variant_id);
    }, 100);
  }

}
