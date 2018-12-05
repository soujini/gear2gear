import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Expense } from 'app/data-model';
import { ExpenseService } from 'app/services/expense/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
  title : string = "Create Expense";
  module :string="expense";
  mode :string="discard";
  message:string="";
  message_error:string="";
  expenseForm: FormGroup;
  selectedExpense_Id: any;
  submitted = false;
  private sub;

  constructor(private fb: FormBuilder, private expenseService:ExpenseService, private router:Router, private route:ActivatedRoute) {
this.expenseService.selectedExpenseId.next(0);
    this.sub=this.expenseService.selectedExpenseId
    .subscribe(
      res => {
        this.selectedExpense_Id = res;
        if(this.expenseService.selectedMode == "Edit"){
          this.title = "Edit Expense";
          this.mode = "delete";
          this.getExpenseById(res);
        }
      },
      err => {

      }
    );
  }


  createForm() {
    this.expenseForm = this.fb.group({
      expense_id: [''],
      name: ['', [Validators.required,Validators.maxLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.expenseForm.valid) {
      if(this.expenseService.selectedMode == 'Create'){
        this.createExpense();
      }
      else if (this.expenseService.selectedMode == 'Edit'){
        this.updateExpense();
      }
    }
  }

  getExpenseById(expense_id:number){
    this.expenseService.getExpenseById(expense_id)
    .subscribe(
      res => {
        this.expenseForm.patchValue(res[0]);
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

  createExpense(){
    this.expenseService.createExpense(this.expenseForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.expenseForm.get('name').value + " created successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
        this.expenseService.refreshList.next(true);
        this.expenseForm.reset();
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

  updateExpense(){
    this.expenseService.updateExpense(this.expenseForm.value)
    .subscribe(
      res => {
        window.scrollTo(0, 0);
        this.message = this.expenseForm.get('name').value + " updated successfully.";
        setTimeout(() => {
          this.message = "";
        },5000);
        this.expenseService.refreshList.next(true);
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

  deleteExpense(event){
    if(this.selectedExpense_Id)
    {
      this.expenseService.deleteExpense(this.selectedExpense_Id).subscribe(
        res => {
          this.expenseService.refreshList.next(true);
          this.router.navigate(['/expense/add']);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.expenseForm.reset();
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
