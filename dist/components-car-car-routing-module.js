(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-car-car-routing-module"],{

/***/ "./node_modules/rxjs-compat/_esm5/BehaviorSubject.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/BehaviorSubject.js ***!
  \***********************************************************/
/*! exports provided: BehaviorSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BehaviorSubject", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]; });


//# sourceMappingURL=BehaviorSubject.js.map

/***/ }),

/***/ "./src/app/components/car/car-form/car-form.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/car/car-form/car-form.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<section class=\"container-fluid section\">\n  <div class=\"row\">\n    <mat-tab-group class=\"col-12\">\n      <mat-tab  label=\"Car Details\">\n        <div class=\"col-12 grey lighten-4\">\n          <header class=\"header row\">\n            <div class=\"col-12\">\n              <app-title [title]=title></app-title>\n              <div *ngIf=\"message != ''\" class=\"alert alert-success text-center col-12\">\n                <strong>Success!</strong>{{message}}\n              </div>\n            </div>\n          </header>\n\n          <div class=\"col-12\">\n            <form [formGroup]=\"carForm\" (ngSubmit)=\"onSubmit()\" >\n              <div class=\"col-12\">\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Make</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\" formControlName=\"make\">\n                        <option *ngFor=\"let make of makes$ | async\" [value]=\"make.make_id\">{{make.name}}</option>\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.make\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Model</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\" formControlName=\"model\">\n                        <option *ngFor=\"let model of models$ | async\" [value]=\"model.model_id\">{{model.name}}</option>\n\n                      </select>\n                      <app-control-messages [control]=\"carForm.controls.model\"></app-control-messages>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Description</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"description\">\n\n                      <!-- <app-control-messages [control]=\"carForm.controls.year\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Registration Number</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"license_plate\">\n\n                      <!-- <app-control-messages [control]=\"carForm.controls.year\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Variant</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\"  formControlName=\"variant\">\n                        <option *ngFor=\"let variant of variants$ | async\" [value]=\"variant.variant_id\">{{variant.name}}</option>\n\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.variant\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Make Year</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"make_year\">\n\n                      <!-- <app-control-messages [control]=\"carForm.controls.year\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Make Month</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"make_month\">\n\n                      <!-- <app-control-messages [control]=\"carForm.controls.year\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Mileage</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"mileage\" (keyup)=\"formatCurrency(carForm.controls.mileage)\">\n                      <!-- <app-control-messages [control]=\"carForm.controls.mileage\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Owners</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"owners\">\n                      <!-- <app-control-messages [control]=\"carForm.controls.mileage\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Vehicle Type</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\" formControlName=\"vehicle_type\">\n                        <option *ngFor=\"let vehicleType of vehicleTypes$ | async\" [value]=\"vehicleType.vehicle_type_id\">{{vehicleType.name}}</option>\n\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.vehicleType\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Fuel Type</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\" formControlName=\"fuel_type\">\n                        <option *ngFor=\"let fuelType of fuelTypes$ | async\" [value]=\"fuelType.fuel_type_id\">{{fuelType.name}}</option>\n\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.fuelType\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Transmission Type</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\"  formControlName=\"transmission_type\">\n                        <option *ngFor=\"let transmissionType of transmissionTypes$ | async\" [value]=\"transmissionType.transmission_type_id\">{{transmissionType.name}}</option>\n\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.transmissionType\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Insurance Type</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\"  formControlName=\"insurance_type\">\n                        <option *ngFor=\"let insuranceType of insuranceTypes$ | async\" [value]=\"insuranceType.insurance_type_id\">{{insuranceType.name}}</option>\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.insuranceType\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Insurance</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\" formControlName=\"insurance\">\n                        <option *ngFor=\"let insurance of insurances$ | async\" [value]=\"insurance.insurance_id\">{{insurance.name}}</option>\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.insurance\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Insurance Year</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"insurance_year\">\n                      <!-- <app-control-messages [control]=\"carForm.controls.year\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Exterior Color</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\"  formControlName=\"exterior_color\">\n                        <option *ngFor=\"let color of colors$ | async\" [value]=\"color.color_id\">{{color.name}}</option>\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.color\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Interior Color</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\"  formControlName=\"interior_color\">\n                        <option *ngFor=\"let color of colors$ | async\" [value]=\"color.color_id\">{{color.name}}</option>\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.color\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Fuel Economy</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"fuel_economy\">\n                      <!-- <app-control-messages [control]=\"carForm.controls.PurchasedFor\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"form-group\">\n                    <label class=\"col-sm-3 col-form-label\">Purchased On</label>\n                    <div>\n                      <div class=\"md-form mt-0\">\n                        <input type=\"date\" class=\"form-control\" formControlName=\"purchased_on\">\n                        <!-- <app-control-messages [control]=\"carForm.controls.purchasedOn\"></app-control-messages> -->\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Purchased From</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <select class=\"form-control\" formControlName=\"purchased_from\">\n                        <option *ngFor=\"let client of clients$ | async\" [value]=\"client.client_id\">{{client.name}}</option>\n                      </select>\n                      <!-- <app-control-messages [control]=\"carForm.controls.purchasedFrom\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"col-sm-3 col-form-label\">Purchased For</label>\n                  <div>\n                    <div class=\"md-form mt-0\">\n                      <input type=\"text\" class=\"form-control\" formControlName=\"cost_price\" (keyup)=\"formatCurrency(carForm.controls.cost_price)\">\n                      <!-- <app-control-messages [control]=\"carForm.controls.PurchasedFor\"></app-control-messages> -->\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-check\">\n                  <input type=\"checkbox\" class=\"form-check-input\" id=\"inputFlooded\" formControlName=\"is_flooded\">\n                  <label class=\"form-check-label\" for=\"inputFlooded\">Is Flooded?</label>\n                </div>\n                <div class=\"form-check\">\n                  <input type=\"checkbox\" class=\"form-check-input\" id=\"inputAccidental\" formControlName=\"is_accidental\">\n                  <label class=\"form-check-label\" for=\"inputAccidental\">Is Accidental?</label>\n                </div>\n\n              <div class=\"form-check\">\n                <input type=\"checkbox\" class=\"form-check-input\" id=\"inputSold\" formControlName=\"is_sold\" (change)=\"is_sold($event)\">\n                <label class=\"form-check-label\" for=\"inputSold\">Is Sold?</label>\n              </div>\n                <div class=\"form-group\">\n                <label class=\"col-sm-3 col-form-label\">Sold On</label>\n                <div>\n                  <div class=\"md-form mt-0\">\n                    <input type=\"date\" class=\"form-control\" formControlName=\"sold_on\">\n                    <!-- <dl-date-time-picker minView='day' formControlName=\"sold_on\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown1' }\"></dl-date-time-picker> -->\n                    <!-- <app-control-messages [control]=\"carForm.controls.soldOn\"></app-control-messages> -->\n                  </div>\n                </div>\n              </div>\n                <div class=\"form-group\">\n                <label class=\"col-sm-3 col-form-label\">Sold To</label>\n                <div>\n                  <div class=\"md-form mt-0\">\n                    <select class=\"form-control\"  formControlName=\"sold_to\">\n                      <option *ngFor=\"let client of clients$ | async\" [value]=\"client.client_id\">{{client.name}}</option>\n                    </select>\n                    <!-- <app-control-messages [control]=\"carForm.controls.soldTo\"></app-control-messages> -->\n                  </div>\n                </div>\n              </div>\n                <div class=\"form-group\">\n                <label class=\"col-sm-3 col-form-label\">Sold For</label>\n                <div>\n                  <div class=\"md-form mt-0\">\n                    <input type=\"text\" class=\"form-control \" formControlName=\"selling_price\" (keyup)=\"formatCurrency(carForm.controls.selling_price)\">\n                    <!-- <app-control-messages [control]=\"carForm.controls.soldFor\"></app-control-messages> -->\n                  </div>\n                </div>\n              </div>\n                <div class=\"form-group\">\n                <label class=\"col-sm-3 col-form-label\">Upload Photos</label>\n                <div>\n                  <div class=\"md-form mt-0\">\n                    <input type=\"file\" multiple=\"multiple\" name=\"fileUpload\">\n                    <!-- <app-control-messages [control]=\"carForm.controls.soldFor\"></app-control-messages> -->\n                  </div>\n                </div>\n              </div>\n                <div class=\"text-right\">\n                  <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n                    <i class=\"fa fa-save\"></i>\n                  </button>\n                  <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"carForm.controls.make.value\" (isDelete)=\"deleteCar($event)\"></app-simple-modal>\n\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </mat-tab>\n      <mat-tab *ngIf=\"selectedCar_Id\" class=\"col-12\" label=\"Transaction Details\">\n      <app-transaction-details (opMessage)=\"setMessage($event)\" [investors$]=\"investors$\" [transactionTypes$]=\"transactionTypes$\" [expenses$]=\"expenses$\" [carForm]=\"carForm\"></app-transaction-details>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/car/car-form/car-form.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/car/car-form/car-form.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/car/car-form/car-form.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/car/car-form/car-form.component.ts ***!
  \***************************************************************/
/*! exports provided: CarFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarFormComponent", function() { return CarFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_car_car_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/car/car.service */ "./src/app/services/car/car.service.ts");
/* harmony import */ var app_services_make_make_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/make/make.service */ "./src/app/services/make/make.service.ts");
/* harmony import */ var app_services_model_model_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/services/model/model.service */ "./src/app/services/model/model.service.ts");
/* harmony import */ var app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/services/variant/variant.service */ "./src/app/services/variant/variant.service.ts");
/* harmony import */ var app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/services/vehicle-type/vehicle-type.service */ "./src/app/services/vehicle-type/vehicle-type.service.ts");
/* harmony import */ var app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/services/fuel-type/fuel-type.service */ "./src/app/services/fuel-type/fuel-type.service.ts");
/* harmony import */ var app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/services/transmission-type/transmission-type.service */ "./src/app/services/transmission-type/transmission-type.service.ts");
/* harmony import */ var app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/services/insurance-type/insurance-type.service */ "./src/app/services/insurance-type/insurance-type.service.ts");
/* harmony import */ var app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/services/insurance/insurance.service */ "./src/app/services/insurance/insurance.service.ts");
/* harmony import */ var app_services_color_color_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/services/color/color.service */ "./src/app/services/color/color.service.ts");
/* harmony import */ var app_services_client_client_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/services/client/client.service */ "./src/app/services/client/client.service.ts");
/* harmony import */ var app_services_expense_expense_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/services/expense/expense.service */ "./src/app/services/expense/expense.service.ts");
/* harmony import */ var app_services_transaction_type_transaction_type_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/services/transaction-type/transaction-type.service */ "./src/app/services/transaction-type/transaction-type.service.ts");
/* harmony import */ var app_services_transaction_details_transaction_details_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/services/transaction-details/transaction-details.service */ "./src/app/services/transaction-details/transaction-details.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var CarFormComponent = /** @class */ (function () {
    function CarFormComponent(fb, router, route, carService, makeService, modelService, variantService, vehicleTypeService, fuelTypeService, transmissionTypeService, insuranceTypeService, insuranceService, colorService, clientService, expenseService, transactionTypeService, transactionDetailsService) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.carService = carService;
        this.makeService = makeService;
        this.modelService = modelService;
        this.variantService = variantService;
        this.vehicleTypeService = vehicleTypeService;
        this.fuelTypeService = fuelTypeService;
        this.transmissionTypeService = transmissionTypeService;
        this.insuranceTypeService = insuranceTypeService;
        this.insuranceService = insuranceService;
        this.colorService = colorService;
        this.clientService = clientService;
        this.expenseService = expenseService;
        this.transactionTypeService = transactionTypeService;
        this.transactionDetailsService = transactionDetailsService;
        this.title = "Create Car";
        this.module = "car";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
        this.sold = false;
    }
    CarFormComponent.prototype.createForm = function () {
        this.carForm = this.fb.group({
            car_id: [],
            make: [],
            model: [],
            description: [],
            variant: [],
            vehicle_type: [],
            fuel_type: [],
            transmission_type: [],
            insurance_type: [],
            insurance: [],
            exterior_color: [],
            interior_color: [],
            fuel_economy: [],
            mileage: [],
            make_year: [],
            owners: [],
            cost_price: [],
            purchased_from: [],
            purchased_on: [],
            selling_price: [],
            sold_to: [],
            sold_on: [],
            make_month: [],
            insurance_year: [],
            is_accidental: [],
            is_flooded: [],
            is_sold: [],
            license_plate: [],
            total_cost: [0],
            total_income: [0]
        });
    };
    CarFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.carForm.valid) {
            if (this.carService.selectedMode == 'Create') {
                this.createCar();
            }
            else if (this.carService.selectedMode == 'Edit') {
                this.updateCar();
            }
        }
    };
    CarFormComponent.prototype.getCarById = function (car_id) {
        var _this = this;
        this.carService.getCarById(car_id)
            .subscribe(function (res) {
            _this.patchForm(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    CarFormComponent.prototype.patchForm = function (res) {
        this.carForm.patchValue(res);
    };
    CarFormComponent.prototype.createCar = function () {
        var _this = this;
        this.carForm.patchValue({
            total_cost: this.carForm.controls.cost_price.value,
        });
        this.carService.createCar(this.carForm.value)
            .subscribe(function (res) {
            _this.carService.refreshList.next(true);
            _this.carForm.reset();
            _this.selectCar(res.car_id);
            // this.router.navigate(['/car/edit']);
            _this.getCarById(res.car_id);
        }, function (err) {
            console.log(err);
        });
    };
    CarFormComponent.prototype.updateCar = function () {
        var _this = this;
        this.carService.updateCar(this.carForm.value)
            .subscribe(function (res) {
            _this.carService.refreshList.next(true);
            window.scrollTo(0, 0);
            _this.message = res.message;
            setTimeout(function () {
                _this.message = "";
                //this.router.navigate(['/car/add']);
            }, 5000);
        }, function (err) {
            console.log(err);
        });
    };
    CarFormComponent.prototype.deleteCar = function (event) {
        var _this = this;
        if (this.selectedCar_Id) {
            this.carService.deleteCar(this.selectedCar_Id).subscribe(function (res) {
                _this.carService.refreshList.next(true);
                _this.router.navigate(['/car/add']);
                console.log("Delete Car : ", res.message);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.carForm.reset();
        }
    };
    CarFormComponent.prototype.selectCar = function (car_id) {
        var _this = this;
        this.carService.selectedMode = 'Edit';
        this.router.navigate(['/car/edit']);
        setTimeout(function () {
            _this.carService.selectedCarId.next(car_id);
        }, 100);
    };
    CarFormComponent.prototype.getMakes = function () {
        this.makes$ = this.makeService.getMakes();
    };
    CarFormComponent.prototype.getModels = function () {
        this.models$ = this.modelService.getModels();
    };
    CarFormComponent.prototype.getVariants = function () {
        this.variants$ = this.variantService.getVariants();
    };
    CarFormComponent.prototype.getVehicleTypes = function () {
        this.vehicleTypes$ = this.vehicleTypeService.getVehicleTypes();
    };
    CarFormComponent.prototype.getFuelTypes = function () {
        this.fuelTypes$ = this.fuelTypeService.getFuelTypes();
    };
    CarFormComponent.prototype.getTransmissionTypes = function () {
        this.transmissionTypes$ = this.transmissionTypeService.getTransmissionTypes();
    };
    CarFormComponent.prototype.getInsuranceTypes = function () {
        this.insuranceTypes$ = this.insuranceTypeService.getInsuranceTypes();
    };
    CarFormComponent.prototype.getInsurances = function () {
        this.insurances$ = this.insuranceService.getInsurances();
    };
    CarFormComponent.prototype.getColors = function () {
        this.colors$ = this.colorService.getColors();
    };
    CarFormComponent.prototype.getClients = function () {
        this.clients$ = this.clientService.getClients();
    };
    CarFormComponent.prototype.getExpenses = function () {
        this.expenses$ = this.expenseService.getExpenses();
    };
    CarFormComponent.prototype.getInvestors = function () {
        this.investors$ = this.clientService.getInvestors();
    };
    CarFormComponent.prototype.getTransactionTypes = function () {
        this.transactionTypes$ = this.transactionTypeService.getTransactionTypes();
    };
    CarFormComponent.prototype.formatCurrency1 = function (control) {
        //  var val = this.carForm.controls.expenses.value;
        var val = control.value;
        var x = val.replace(/,/g, "");
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        control.setValue(res);
    };
    CarFormComponent.prototype.formatCurrency = function (control) {
        var val = control.value;
        var x = val.toString().replace(/,/g, "");
        var afterPoint = '';
        if (x.indexOf('.') > 0)
            afterPoint = x.substring(x.indexOf('.'), x.length);
        x = Math.floor(x);
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        control.setValue(res);
    };
    CarFormComponent.prototype.is_sold = function () {
        if (this.carService.selectedMode == "Edit") {
            if (this.carForm.get('is_sold').value == true) {
                this.carService.sold.next(true);
            }
            else {
                this.carService.sold.next(false);
            }
        }
    };
    CarFormComponent.prototype.setMessage = function (event) {
        this.carForm.patchValue({
            'is_sold': false,
        });
        window.scrollTo(0, 0);
        this.message = event;
    };
    CarFormComponent.prototype.ngOnInit = function () {
        var _this = this;
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
            .subscribe(function (res) {
            if (res != 0) {
                _this.selectedCar_Id = res;
                if (_this.carService.selectedMode == "Edit") {
                    _this.title = "Edit Car";
                    _this.mode = "delete";
                    _this.getCarById(res);
                    _this.carService.transactionDetail.next("true");
                }
            }
        });
    };
    CarFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-car-form',
            template: __webpack_require__(/*! ./car-form.component.html */ "./src/app/components/car/car-form/car-form.component.html"),
            styles: [__webpack_require__(/*! ./car-form.component.scss */ "./src/app/components/car/car-form/car-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            app_services_car_car_service__WEBPACK_IMPORTED_MODULE_3__["CarService"],
            app_services_make_make_service__WEBPACK_IMPORTED_MODULE_4__["MakeService"],
            app_services_model_model_service__WEBPACK_IMPORTED_MODULE_5__["ModelService"],
            app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_6__["VariantService"],
            app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_7__["VehicleTypeService"],
            app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_8__["FuelTypeService"],
            app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_9__["TransmissionTypeService"],
            app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_10__["InsuranceTypeService"],
            app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_11__["InsuranceService"],
            app_services_color_color_service__WEBPACK_IMPORTED_MODULE_12__["ColorService"],
            app_services_client_client_service__WEBPACK_IMPORTED_MODULE_13__["ClientService"],
            app_services_expense_expense_service__WEBPACK_IMPORTED_MODULE_14__["ExpenseService"],
            app_services_transaction_type_transaction_type_service__WEBPACK_IMPORTED_MODULE_15__["TransactionTypeService"],
            app_services_transaction_details_transaction_details_service__WEBPACK_IMPORTED_MODULE_16__["TransactionDetailsService"]])
    ], CarFormComponent);
    return CarFormComponent;
}());



/***/ }),

/***/ "./src/app/components/car/car-list/car-list.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/car/car-list/car-list.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchCars($event)\" (isCreate)=\"createCar('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Make</th>\n          <th>Model</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let car of results$ | async'>\n          <th scope=\"row\">{{car.car_id}}</th>\n          <td>{{car.make_name}}</td>\n            <td>{{car.model_name}}</td>\n          <td class=\"pointer\" (click)=\"selectCar(car.car_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/car/car-list/car-list.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/car/car-list/car-list.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/car/car-list/car-list.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/car/car-list/car-list.component.ts ***!
  \***************************************************************/
/*! exports provided: CarListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarListComponent", function() { return CarListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_car_car_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/car/car.service */ "./src/app/services/car/car.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CarListComponent = /** @class */ (function () {
    function CarListComponent(carService, router, route) {
        this.carService = carService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    CarListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/car/add']);
    };
    CarListComponent.prototype.searchCars = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    CarListComponent.prototype.createCar = function (mode) {
        this.carService.selectedMode = mode;
        this.router.navigate(['/car/add']);
    };
    //On Click of the Edit Button
    CarListComponent.prototype.selectCar = function (car_id, mode) {
        var _this = this;
        this.carService.selectedMode = mode;
        this.router.navigate(['/car/edit']);
        setTimeout(function () {
            _this.carService.selectedCarId.next(car_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], CarListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CarListComponent.prototype, "searchTerm", void 0);
    CarListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-car-list',
            template: __webpack_require__(/*! ./car-list.component.html */ "./src/app/components/car/car-list/car-list.component.html"),
            styles: [__webpack_require__(/*! ./car-list.component.scss */ "./src/app/components/car/car-list/car-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_car_car_service__WEBPACK_IMPORTED_MODULE_3__["CarService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], CarListComponent);
    return CarListComponent;
}());



/***/ }),

/***/ "./src/app/components/car/car-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/components/car/car-routing.module.ts ***!
  \******************************************************/
/*! exports provided: CarRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarRoutingModule", function() { return CarRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _car_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./car.component */ "./src/app/components/car/car.component.ts");
/* harmony import */ var _car_list_car_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./car-list/car-list.component */ "./src/app/components/car/car-list/car-list.component.ts");
/* harmony import */ var _car_form_car_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./car-form/car-form.component */ "./src/app/components/car/car-form/car-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var carRoutes = [
    {
        path: 'car',
        component: _car_component__WEBPACK_IMPORTED_MODULE_2__["CarComponent"],
        children: [
            { path: 'list', component: _car_list_car_list_component__WEBPACK_IMPORTED_MODULE_3__["CarListComponent"] },
            { path: 'add', component: _car_form_car_form_component__WEBPACK_IMPORTED_MODULE_4__["CarFormComponent"] },
            { path: 'edit', component: _car_form_car_form_component__WEBPACK_IMPORTED_MODULE_4__["CarFormComponent"] }
        ]
    }
];
var CarRoutingModule = /** @class */ (function () {
    function CarRoutingModule() {
    }
    CarRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(carRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CarRoutingModule);
    return CarRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/car/car.component.html":
/*!***************************************************!*\
  !*** ./src/app/components/car/car.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-car-list (searchTerm)=\"searchCars($event)\" [results$]=\"cars$\"></app-car-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/car/car.component.scss":
/*!***************************************************!*\
  !*** ./src/app/components/car/car.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/car/car.component.ts":
/*!*************************************************!*\
  !*** ./src/app/components/car/car.component.ts ***!
  \*************************************************/
/*! exports provided: CarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarComponent", function() { return CarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_car_car_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/car/car.service */ "./src/app/services/car/car.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CarComponent = /** @class */ (function () {
    function CarComponent(fb, carService, router, route) {
        this.fb = fb;
        this.carService = carService;
        this.router = router;
        this.route = route;
        this.title = "Car";
    }
    CarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCars();
        this.carService.refreshList.subscribe(function (res) {
            _this.getCars();
        }, function (err) {
            console.log(err);
        });
    };
    CarComponent.prototype.getCars = function () {
        this.cars$ = this.carService.getCars();
    };
    CarComponent.prototype.searchCars = function (searchTerm) {
        if (searchTerm) {
            this.cars$ = this.carService.searchCars(searchTerm);
        }
        else {
            this.cars$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    CarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-car',
            template: __webpack_require__(/*! ./car.component.html */ "./src/app/components/car/car.component.html"),
            styles: [__webpack_require__(/*! ./car.component.scss */ "./src/app/components/car/car.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_car_car_service__WEBPACK_IMPORTED_MODULE_4__["CarService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CarComponent);
    return CarComponent;
}());



/***/ }),

/***/ "./src/app/services/car/car.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/car/car.service.ts ***!
  \*********************************************/
/*! exports provided: CarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarService", function() { return CarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
/* harmony import */ var rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/BehaviorSubject */ "./node_modules/rxjs-compat/_esm5/BehaviorSubject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var CarService = /** @class */ (function () {
    function CarService(http) {
        this.http = http;
        this.carsUrl = '/api/cars';
        this.putUrl = '/api/cars';
        this.selectedCarId = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"](0);
        this.sold = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.transactionDetail = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"]("");
    }
    CarService.prototype.getCars = function () {
        return this.http.get('http://localhost:3000/api/cars', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.getAvailableCars = function () {
        return this.http.get('http://localhost:3000/api/available-cars', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.getSoldCars = function () {
        return this.http.get('http://localhost:3000/api/sold-cars', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.getCarById = function (car_id) {
        return this.http.get('http://localhost:3000/api/cars/' + car_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.searchCars = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/cars/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.createCar = function (newCar) {
        var body = JSON.stringify(newCar);
        return this.http.post('http://localhost:3000/api/cars', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.updateCar = function (editCar) {
        var body = JSON.stringify(editCar);
        var car_id = editCar.car_id;
        return this.http.put("http://localhost:3000/api/cars/" + car_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.updateTotalCost = function (car) {
        var body = JSON.stringify(car);
        var car_id = car.car_id;
        return this.http.patch('http://localhost:3000/api/cars/' + car_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .subscribe(function (res) {
            console.log("asdadsada", res);
        }, function (err) {
            console.log("error here", err);
        }, function () {
            console.log("Completed");
        });
    };
    CarService.prototype.updateTotalIncome = function (car) {
        var body = JSON.stringify(car);
        var car_id = car.car_id;
        return this.http.patch('http://localhost:3000/api/cars/income/' + car_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .subscribe(function (res) {
            console.log("Total Income of the car is Updated", res);
        }, function (err) {
            console.log("error here", err);
        }, function () {
            console.log("Completed");
        });
    };
    CarService.prototype.deleteCar = function (car_id) {
        return this.http.delete('http://localhost:3000/api/cars/' + car_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    CarService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    CarService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    CarService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    CarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CarService);
    return CarService;
}());



/***/ }),

/***/ "./src/app/services/transaction-details/transaction-details.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/services/transaction-details/transaction-details.service.ts ***!
  \*****************************************************************************/
/*! exports provided: TransactionDetailsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionDetailsService", function() { return TransactionDetailsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var TransactionDetailsService = /** @class */ (function () {
    function TransactionDetailsService(http) {
        this.http = http;
        this.transactionDetailsUrl = '/api/transactionDetails';
        this.putUrl = '/api/transactionDetails';
        this.selectedTransactionDetailsId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    TransactionDetailsService.prototype.getTransactionDetails = function () {
        return this.http.get('http://localhost:3000/api/transactionDetails', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.getTransactionDetailsById = function (transaction_details_id) {
        return this.http.get('http://localhost:3000/api/transactionDetails/' + transaction_details_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.getTotalInvestmentAndBalanceByCar = function (car_id) {
        return this.http.get('http://localhost:3000/api/transactionDetails/totalInvestmentBalance/' + car_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    // public searchTransactionDetailss(searchTerm): Observable<any> {
    //   return this.http.get('http://localhost:3000/api/transactionDetails/search/'+searchTerm, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
    //   .map(res => res);
    // }
    TransactionDetailsService.prototype.createTransactionDetails = function (newTransactionDetails) {
        console.log(newTransactionDetails);
        var body = JSON.stringify(newTransactionDetails);
        return this.http.post('http://localhost:3000/api/transactionDetails', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.createTransactionDetailsProfitAndLoss = function (newTransactionDetails) {
        var body = JSON.stringify(newTransactionDetails);
        return this.http.post('http://localhost:3000/api/transactionDetails/profitAndLoss', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.updateTransactionDetails = function (editTransactionDetails) {
        var body = JSON.stringify(editTransactionDetails);
        var transaction_details_id = editTransactionDetails.transaction_details_id;
        return this.http.put("http://localhost:3000/api/transactionDetails/" + transaction_details_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.deleteTransactionDetails = function (transaction_details_id) {
        return this.http.delete('http://localhost:3000/api/transactionDetails/' + transaction_details_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.deleteProfitOrLossTransactionDetails = function (car_id, investorsExpensesAndPercent) {
        var investorsDetails = JSON.stringify(investorsExpensesAndPercent);
        var options = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json; charset=utf-8',
            }),
            body: investorsDetails,
        };
        return this.http.delete('http://localhost:3000/api/transactionDetails/deleteProfitOrLoss/' + car_id, options)
            .map(function (res) { return res; });
    };
    TransactionDetailsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    TransactionDetailsService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    TransactionDetailsService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    TransactionDetailsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TransactionDetailsService);
    return TransactionDetailsService;
}());



/***/ }),

/***/ "./src/app/services/transaction-type/transaction-type.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/services/transaction-type/transaction-type.service.ts ***!
  \***********************************************************************/
/*! exports provided: TransactionTypeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionTypeService", function() { return TransactionTypeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var TransactionTypeService = /** @class */ (function () {
    function TransactionTypeService(http) {
        this.http = http;
        this.transactionTypesUrl = '/api/transactionTypes';
        this.putUrl = '/api/transactionTypes';
        this.selectedTransactionTypeId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    TransactionTypeService.prototype.getTransactionTypes = function () {
        return this.http.get('http://localhost:3000/api/transactionTypes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionTypeService.prototype.getTransactionTypeById = function (transaction_type_id) {
        return this.http.get('http://localhost:3000/api/transactionTypes/' + transaction_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionTypeService.prototype.searchTransactionTypes = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/transactionTypes/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionTypeService.prototype.createTransactionType = function (newTransactionType) {
        var body = JSON.stringify(newTransactionType);
        return this.http.post('http://localhost:3000/api/transactionTypes', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionTypeService.prototype.updateTransactionType = function (editTransactionType) {
        var body = JSON.stringify(editTransactionType);
        var transaction_type_id = editTransactionType.transaction_type_id;
        return this.http.put("http://localhost:3000/api/transactionTypes/" + transaction_type_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionTypeService.prototype.deleteTransactionType = function (transaction_type_id) {
        return this.http.delete('http://localhost:3000/api/transactionTypes/' + transaction_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransactionTypeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    TransactionTypeService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    TransactionTypeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    TransactionTypeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TransactionTypeService);
    return TransactionTypeService;
}());



/***/ })

}]);
//# sourceMappingURL=components-car-car-routing-module.js.map