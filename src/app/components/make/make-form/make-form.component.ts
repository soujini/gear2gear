import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.scss']
})
export class MakeFormComponent implements OnInit {
  title : string = "Create Make";
  makeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.makeForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }
onSubmit(){
  
}
  ngOnInit() {
  }

  }
