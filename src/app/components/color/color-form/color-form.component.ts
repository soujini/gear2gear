import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Color } from 'app/data-model';
import { ColorService } from 'app/services/color/color.service';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss']
})
export class ColorFormComponent implements OnInit {
  title : string = "Create Color";
  module :string="color";
  mode :string="discard";
  message:string="";
  message_error:string="";
  colorForm: FormGroup;
  selectedColor_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder,
    private colorService:ColorService,
    private router:Router,
    private route:ActivatedRoute) {
      this.colorService.selectedColorId.next(0);

      this.sub= this.colorService.selectedColorId
      .subscribe(
        res => {
          this.selectedColor_Id = res;
          if(this.colorService.selectedMode == "Edit"){
            this.title = "Edit Color"
            this.mode = "delete";
            this.getColorById(res);
          }
        },
        err => {

        }
      );
    }

    createForm() {
      this.colorForm = this.fb.group({
        color_id: [''],
        name: ['', [Validators.required,Validators.maxLength(50)]],
      });
    }

    onSubmit(){
      this.submitted = true;
      if (this.colorForm.valid) {
        if(this.colorService.selectedMode == 'Create'){
          this.createColor();
        }
        else if (this.colorService.selectedMode == 'Edit'){
          this.updateColor();
        }
      }
    }

    getColorById(color_id:number){
      this.colorService.getColorById(color_id)
      .subscribe(
        res => {
          this.colorForm.patchValue(res[0]);
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

    createColor(){
      this.colorService.createColor(this.colorForm.value)
      .subscribe(
        res => {
          window.scrollTo(0, 0);
          this.message = this.colorForm.get('name').value + " created successfully.";
          setTimeout(() => {
            this.message = "";
          },5000);

          this.colorService.refreshList.next(true);
          this.colorForm.reset();
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

    updateColor(){
      this.colorService.updateColor(this.colorForm.value)
      .subscribe(
        res => {
          window.scrollTo(0, 0);
          this.message = this.colorForm.get('name').value + " updated successfully.";
          setTimeout(() => {
            this.message = "";
          },5000);
          this.colorService.refreshList.next(true);
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

    deleteColor(event){
      if(this.selectedColor_Id)
      {
        this.colorService.deleteColor(this.selectedColor_Id).subscribe(
          res => {
            this.colorService.refreshList.next(true);
            this.router.navigate(['/color/add']);
          },
          err => {
            console.log(err);
          }
        );
      }
      else{
        this.colorForm.reset();
      }
    }

    ngOnInit() {
      this.createForm();
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

  }
