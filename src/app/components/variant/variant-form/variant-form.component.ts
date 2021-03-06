import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Variant } from 'app/data-model';
import { VariantService } from 'app/services/variant/variant.service';

@Component({
  selector: 'app-variant-form',
  templateUrl: './variant-form.component.html',
  styleUrls: ['./variant-form.component.scss']
})
export class VariantFormComponent implements OnInit {
  title : string = "Create Variant";
  module :string="variant";
  mode :string="discard";
  message:string="";
  message_error:string="";
  variantForm: FormGroup;
  selectedVariant_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder, private variantService:VariantService, private router:Router, private route:ActivatedRoute) {
    this.variantService.selectedVariantId.next(0);
    this.sub=this.variantService.selectedVariantId
        .subscribe(
          res => {
            this.selectedVariant_Id = res;
            if(this.variantService.selectedMode == "Edit"){
              this.title = "Edit Variant";
              this.mode = "delete";
              this.getVariantById(res);
            }
          },
          err => {

          }
        );
  }


  createForm() {
    this.variantForm = this.fb.group({
      variant_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.variantForm.valid) {
      if(this.variantService.selectedMode == 'Create'){
        this.createVariant();
      }
      else if (this.variantService.selectedMode == 'Edit'){
        this.updateVariant();
      }
    }
  }

  getVariantById(variant_id:number){
    this.variantService.getVariantById(variant_id)
    .subscribe(
        res => {
        this.variantForm.patchValue(res[0]);
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

  createVariant(){
    this.variantService.createVariant(this.variantForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.variantForm.get('name').value + " created successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
        this.variantService.refreshList.next(true);
        this.variantForm.reset();
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

  updateVariant(){
    this.variantService.updateVariant(this.variantForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.variantForm.get('name').value + " updated successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
          this.variantService.refreshList.next(true);
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

  deleteVariant(event){
    if(this.selectedVariant_Id)
    {
      this.variantService.deleteVariant(this.selectedVariant_Id).subscribe(
        res => {
          this.variantService.refreshList.next(true);
          this.router.navigate(['/variant/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.variantForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
