import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from 'app/data-model';
import { ClientService } from 'app/services/client/client.service';
import { CommonService } from 'app/services/common/common.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  title : string = "Client";
  selectedClient : Client;

  clients$: Observable<Client>;

  constructor(private fb: FormBuilder, private clientService:ClientService,private commonService:CommonService, private router: Router, private route: ActivatedRoute) {
//this.getStates();
  }

  ngOnInit() {
    this.getClients();

    this.clientService.refreshList.subscribe(
      res=>{
          this.getClients();
      },
      err => {
        console.log(err);
      }
    );
  }


  getClients()  {
    this.clients$ = this.clientService.getClients();
  }

  searchClients(searchTerm){
    if(searchTerm){
      this.clients$ = this.clientService.searchClients(searchTerm);
    }
    else{
      this.getClients();
      this.clients$ = new EmptyObservable();
    }
  }

//   getStates(){
//     this.commonService.getStates().subscribe(res=>{
//     this.clientService.states$ = res.RestResponse.result;
//   })
// }

}
