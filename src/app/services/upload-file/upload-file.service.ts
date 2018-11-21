import { Injectable,Input,Output } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { FileUpload } from '../../data-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  BUCKET = "gear2gear";
  FOLDER = 'default';

  constructor() { }

  getFiles(folder):Observable <Array<FileUpload>> {

    const fileUploads = new Array<FileUpload>();
    this.FOLDER = folder+'/';

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };
    const bucket = new S3({
      accessKeyId: 'AKIAJS73LQ3ABHAU3Z6Q',
      secretAccessKey: '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',
      region: 'us-east-1'
    });

    bucket.listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);
      const fileDatas = data.Contents;
      const baseURL = "https://s3.amazonaws.com/gear2gear/";
      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(baseURL+file.Key));
      });
    });
    return Observable.of(fileUploads);
  }

  uploadfile(file, folder) {
    this.FOLDER = folder+'/';
    const bucket = new S3(
      {
        accessKeyId: 'AKIAJS73LQ3ABHAU3Z6Q',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );

    let extn = file.name.split('.').pop();
    let contentType = 'application/octet-stream';
    if (extn == 'html') contentType = "text/html";
    if (extn == 'css') contentType = "text/css";
    if (extn == 'js') contentType = "application/javascript";
    if (extn == 'png' || extn == 'jpg' || extn == 'gif') contentType = "image/" + extn;

    const params = {
      Bucket: 'gear2gear',
      Key: this.FOLDER + file.name,
      Body: file,
      ContentType: contentType
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
