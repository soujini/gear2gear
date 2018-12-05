import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Make } from 'app/data-model';
import { MakeService } from 'app/services/make/make.service';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.scss']
})
export class MakeFormComponent implements OnInit {
  title : string = "Create Make";
  module :string="make";
  mode :string="discard";
  message:string="";
  message_error:string="";
  makeForm: FormGroup;
  selectedMake_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder, private makeService:MakeService, private router:Router, private route:ActivatedRoute) {

    this.makeService.selectedMakeId.next(0);

    this.sub = this.makeService.selectedMakeId
    .subscribe(
      res => {
        this.selectedMake_Id = res;
        if(this.makeService.selectedMode == "Edit"){
          this.title = "Edit Make";
          this.mode = "delete";
          this.getMakeById(res);
        }
      },
      err => {

      }
    );

  }


  createForm() {
    this.makeForm = this.fb.group({
      make_id: [''],
      // name: ['', [Validators.required,Validators.maxLength(50)]],
      name: ['', [Validators.required]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.makeForm.valid) {
      if(this.makeService.selectedMode == 'Create'){
        this.createMake();
      }
      else if (this.makeService.selectedMode == 'Edit'){
        this.updateMake();
      }
    }
  }

  getMakeById(make_id:number){
    this.makeService.getMakeById(make_id)
    .subscribe(
        res => {
        this.makeForm.patchValue(res[0]);
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

  createMake(){
    this.makeService.createMake(this.makeForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.makeForm.get('name').value + " created successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
        this.makeService.refreshList.next(true);
        this.makeForm.reset();
      },
      err => {
        window.scrollTo(0, 0);
        this.message_error = err
        setTimeout(() => {
          this.message_error = "";
        },5000);
        console.log(err);
      }
    );
  }

  updateMake(){
    this.makeService.updateMake(this.makeForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.makeForm.get('name').value + " updated successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
          this.makeService.refreshList.next(true);
      },
      err => {
        window.scrollTo(0, 0);
        this.message_error = err
        setTimeout(() => {
          this.message_error = "";
        },5000);
        console.log(err);
      }
    );
  }

  deleteMake(event){
    if(this.selectedMake_Id)
    {
      this.makeService.deleteMake(this.selectedMake_Id).subscribe(
        res => {
          window.scrollTo(0, 0);
          this.message = this.makeForm.get('name').value + " deleted successfully.";
          setTimeout(() => {
            this.message = "";
          },5000);
          this.makeService.refreshList.next(true);
          this.router.navigate(['/make/add']);
        },
        err => {
          window.scrollTo(0, 0);
          this.message_error = err
          setTimeout(() => {
            this.message_error = "";
          },5000);
          console.log(err);
        }
      );
    }
    else{
      this.makeForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
