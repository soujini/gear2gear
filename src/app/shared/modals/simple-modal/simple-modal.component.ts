import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {
  // @ViewChild('content') public contentModal;
  public name: string;

  constructor() { }

  show(value:string){
      this.name = value;
    //  this.contentModal.show();
  }
  ngOnInit() {
  }

}
