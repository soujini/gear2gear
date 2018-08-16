import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Car,Make,Model, Variant, VehicleType, FuelType, TransmissionType, InsuranceType, Insurance, Color, Client, Expense } from 'app/data-model';
import { CarService } from 'app/services/car/car.service';
import { MakeService } from 'app/services/make/make.service';
import { ModelService } from 'app/services/model/model.service';
import { VariantService } from 'app/services/variant/variant.service';
import { VehicleTypeService } from 'app/services/vehicle-type/vehicle-type.service';
import { FuelTypeService } from 'app/services/fuel-type/fuel-type.service';
import { TransmissionTypeService } from 'app/services/transmission-type/transmission-type.service';
import { InsuranceTypeService } from 'app/services/insurance-type/insurance-type.service';
import { InsuranceService } from 'app/services/insurance/insurance.service';
import { ColorService } from 'app/services/color/color.service';
import { ClientService } from 'app/services/client/client.service';
import { ExpenseService } from 'app/services/expense/expense.service';
import { TransactionTypeService } from 'app/services/transaction-type/transaction-type.service';
import { TransactionDetailsService } from 'app/services/transaction-details/transaction-details.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  title : string = "Create Car";
  module :string="car";
  mode :string="discard";
  message:string="";
  carForm: FormGroup;

  selectedCar_Id: any;
  submitted = false;
  sold:boolean=false;
  results$:Observable<Car>;
  makes$:Observable<Make>;
  models$:Observable<Model>;
  variants$:Observable<Variant>;
  vehicleTypes$:Observable<VehicleType>;
  fuelTypes$:Observable<FuelType>;
  transmissionTypes$:Observable<TransmissionType>;
  insuranceTypes$:Observable<InsuranceType>;
  insurances$:Observable<Insurance>;
  colors$:Observable<Color>;
  clients$:Observable<Client>;
  expenses$:Observable<Expense>;
  investors$:Observable<Client>;
  transactionTypes$:Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private carService:CarService,
    private makeService:MakeService,
    private modelService:ModelService,
    private variantService:VariantService,
    private vehicleTypeService:VehicleTypeService,
    private fuelTypeService:FuelTypeService,
    private transmissionTypeService:TransmissionTypeService,
    private insuranceTypeService:InsuranceTypeService,
    private insuranceService:InsuranceService,
    private colorService:ColorService,
    private clientService:ClientService,
    private expenseService:ExpenseService,
    private transactionTypeService:TransactionTypeService,
    private transactionDetailsService:TransactionDetailsService

  ) {
  }

  createForm() {
    this.carForm = this.fb.group({
      car_id: [],
      make : [],//required
      model : [],//required
      description:[],
      variant : [],//required
      vehicle_type : [],//required
      fuel_type : [],//required
      transmission_type : [],//required
      insurance_type : [],
      insurance : [],
      exterior_color : [],
      interior_color:[],
      fuel_economy:[],
      mileage : [],
      make_year : [],//required
      owners : [],
      cost_price : [],//required
      purchased_from : [],//required
      purchased_on : [],//required
      selling_price : [], //required if sold
      sold_to : [],//required if sold
      sold_on : [],//required if sold
      make_month : [],
      insurance_year:[],
      is_accidental:[],
      is_flooded:[],
      is_sold : [],
      license_plate : [],
      total_cost:[0],
      total_income:[0]
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.carForm.valid) {
      if(this.carService.selectedMode == 'Create'){
        this.createCar();
      }
      else if (this.carService.selectedMode == 'Edit'){
        this.updateCar();
      }
    }
  }

  getCarById(car_id:number){
    this.carService.getCarById(car_id)
    .subscribe(
      res => {
        this.patchForm(res[0]);
      },
      err => {
        console.log(err);
      }
    );
  }

  patchForm(res){
    this.carForm.patchValue(res);
  }

  createCar(){
    this.carForm.patchValue({
      total_cost:this.carForm.controls.cost_price.value,
    });
    this.carService.createCar(this.carForm.value)
    .subscribe(
      res => {
        this.carService.refreshList.next(true);
        this.carForm.reset();
        this.selectCar(res.car_id);
        // this.router.navigate(['/car/edit']);
        this.getCarById(res.car_id);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateCar(){
    this.carService.updateCar(this.carForm.value)
    .subscribe(
      res => {
        this.carService.refreshList.next(true);
        window.scrollTo(0, 0);
        this.message = res.message;
        setTimeout(() => {
          this.message ="";
          //this.router.navigate(['/car/add']);
        },5000);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteCar(event){
    if(this.selectedCar_Id)
    {
      this.carService.deleteCar(this.selectedCar_Id).subscribe(
        res => {
          this.carService.refreshList.next(true);
          this.router.navigate(['/car/add']);
          console.log("Delete Car : ",res.message);
        },
        err => {
          console.log(err);
        }
      );
    }
    else{
      this.carForm.reset();
    }
  }
  selectCar(car_id:number){
    this.carService.selectedMode = 'Edit';
    this.router.navigate(['/car/edit']);
    setTimeout(() => {
      this.carService.selectedCarId.next(car_id);
    }, 100);
  }
  getMakes()  {
    this.makes$ = this.makeService.getMakes();
  }
  getModels()  {
    this.models$ = this.modelService.getModels();
  }
  getVariants()  {
    this.variants$ = this.variantService.getVariants();
  }
  getVehicleTypes()  {
    this.vehicleTypes$ = this.vehicleTypeService.getVehicleTypes();
  }
  getFuelTypes()  {
    this.fuelTypes$ = this.fuelTypeService.getFuelTypes();
  }
  getTransmissionTypes()  {
    this.transmissionTypes$ = this.transmissionTypeService.getTransmissionTypes();
  }
  getInsuranceTypes()  {
    this.insuranceTypes$ = this.insuranceTypeService.getInsuranceTypes();
  }
  getInsurances()  {
    this.insurances$ = this.insuranceService.getInsurances();
  }
  getColors()  {
    this.colors$ = this.colorService.getColors();
  }
  getClients()  {
    this.clients$ = this.clientService.getClients();
  }
  getExpenses()  {
    this.expenses$ = this.expenseService.getExpenses();
  }
  getInvestors()  {
    this.investors$ = this.clientService.getInvestors();
  }
  getTransactionTypes()  {
    this.transactionTypes$ = this.transactionTypeService.getTransactionTypes();
  }


  formatCurrency1(control){
    //  var val = this.carForm.controls.expenses.value;
    var val = control.value;
    let x = val.replace( /,/g, "" );
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
    lastThree = ',' + lastThree;
    var res = otherNumbers(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    control.setValue(res);
  }

  formatCurrency(control){
    var val = control.value;
    let x = val.toString().replace( /,/g, "" );
    var afterPoint = '';
    if(x.indexOf('.') > 0)
    afterPoint = x.substring(x.indexOf('.'),x.length);
    x = Math.floor(x);
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
    lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    control.setValue(res);
  }

  is_sold(){
    if(this.carService.selectedMode == "Edit"){
    if(this.carForm.get('is_sold').value == true){
      this.carService.sold.next(true);
    }
    else{
      this.carService.sold.next(false);
    }
  }
  }
  setMessage(event){
    this.carForm.patchValue({
      'is_sold':false,
    });
    window.scrollTo(0, 0);
    this.message = event;
  }

  ngOnInit() {
    this.createForm();
    this.getMakes();
    this.getModels();
    this.getVariants();
    this.getVehicleTypes();
    this.getFuelTypes();
    this.getTransmissionTypes();
    this.getInsuranceTypes();
    this.getInsurances();
    this.getColors();
    this.getClients();
    this.getExpenses();
    this.getInvestors();
    this.getTransactionTypes();

    this.carService.selectedCarId
    .subscribe(
      res => {
        if(res != 0){
        this.selectedCar_Id = res;
        if(this.carService.selectedMode == "Edit"){
          this.title = "Edit Car"
          this.mode = "delete";
          this.getCarById(res);
          this.carService.transactionDetail.next("true");
        }
      }
      });

  }
}
