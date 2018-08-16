import { Component, OnInit,ViewChild, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {
  // @ViewChild('content') public contentModal;
  @Input() module :string = "";
  @Input() mode :string = "";
  @Input() name :string = "";
  @Output() isDelete = new EventEmitter();


  constructor() { }

  ngOnInit() {

  }
  delete(){
      this.isDelete.emit(true);
      document.getElementById('linkid').click();
  }
}
