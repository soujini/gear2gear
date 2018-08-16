import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

import { Client,Make,Model } from 'app/data-model';
import { ClientService } from 'app/services/client/client.service';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  @Input()
  results$: Observable<Client>;


  @Output()
  searchTerm = new EventEmitter();

  constructor(private clientService:ClientService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['/client/add']);
  }

  searchClients(search: string){
    this.searchTerm.emit(search);
  }

  //On Click of the Add Button
  createClient(mode:any){
    this.clientService.selectedMode = mode;
    this.router.navigate(['/client/add']);
  }

  //On Click of the Edit Button
  selectClient(client_id:number, mode:any){
    this.clientService.selectedMode = mode;
    this.router.navigate(['/client/edit']);
    setTimeout(() => {
      this.clientService.selectedClientId.next(client_id);
    }, 100);
  }

}
