import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from 'app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  @Input() car_id :string = "default"; //Will be the folder name

  selectedFiles: FileList;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  upload() {
    //console.log("total files ", this.selectedFiles.length);
    for(var i=0;i<this.selectedFiles.length;i++){
      const file = this.selectedFiles.item(i);
      this.uploadService.uploadfile(file,this.car_id);
    }

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
