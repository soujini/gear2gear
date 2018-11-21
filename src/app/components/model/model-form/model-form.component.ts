import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Model } from 'app/data-model';
import { ModelService } from 'app/services/model/model.service';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {
  title : string = "Create Model";
  module :string="model";
  mode :string="discard";
  message:string="";
  message_error:string="";
  modelForm: FormGroup;
  selectedModel_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder, private modelService:ModelService, private router:Router, private route:ActivatedRoute) {
    this.sub = this.modelService.selectedModelId
    .subscribe(
      res => {
        this.selectedModel_Id = res;
        if(this.modelService.selectedMode == "Edit"){
          this.title = "Edit Model";
          this.mode = "delete";
          this.getModelById(res);
        }
      },
      err => {

      }
    );
  }

  createForm() {
    this.modelForm = this.fb.group({
      model_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.modelForm.valid) {
      if(this.modelService.selectedMode == 'Create'){
        this.createModel();
      }
      else if (this.modelService.selectedMode == 'Edit'){
        this.updateModel();
      }
    }
  }

  getModelById(model_id:number){
    this.modelService.getModelById(model_id)
    .subscribe(
        res => {
        this.modelForm.patchValue(res[0]);
        },
        err => {
          window.scrollTo(0, 0);
          this.message_error = err;
          setTimeout(() => {
            this.message_error = "";
          },5000);
          console.log(err);
        }
      );
  }

  createModel(){
    this.modelService.createModel(this.modelForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.modelForm.get('name').value + " created successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);

        this.modelService.refreshList.next(true);
        this.modelForm.reset();
      },
      err => {
        window.scrollTo(0, 0);
        this.message_error = err;
        setTimeout(() => {
          this.message_error = "";
        },5000);
        console.log(err);
      }
    );
  }

  updateModel(){
    this.modelService.updateModel(this.modelForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.modelForm.get('name').value + " updated successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
          this.modelService.refreshList.next(true);
      },
      err => {
        window.scrollTo(0, 0);
        this.message_error = err;
        setTimeout(() => {
          this.message_error = "";
        },5000);
        console.log(err);
      }
    );
  }

  deleteModel(event){
    if(this.selectedModel_Id)
    {
      this.modelService.deleteModel(this.selectedModel_Id).subscribe(
        res => {
          this.modelService.refreshList.next(true);
          this.router.navigate(['/model/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.modelForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
