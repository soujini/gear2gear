(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-client-client-routing-module"],{

/***/ "./src/app/components/client/client-form/client-form.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/components/client/client-form/client-form.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n    <div class=\"col-12\">\n      <form [formGroup]=\"clientForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputClientName\" class=\"col-sm-3 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputClientName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"clientForm.controls.name.touched && clientForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"clientForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"inputPhone\" class=\"col-sm-3 col-form-label\">Phone</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputPhone\" formControlName=\"phone\">\n              <!-- <p style=\"color:red\" *ngIf=\"clientForm.controls.name.touched && clientForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"clientForm.controls.phone\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"inputEmail\" class=\"col-sm-3 col-form-label\">Email</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control\" id=\"inputEmail\" formControlName=\"email\">\n              <!-- <p style=\"color:red\" *ngIf=\"clientForm.controls.name.touched && clientForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"clientForm.controls.email\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"inputAddress\" class=\"col-sm-3 col-form-label\">Address</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputAddress\" formControlName=\"address\">\n              <!-- <p style=\"color:red\" *ngIf=\"clientForm.controls.name.touched && clientForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"clientForm.controls.address\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"inputCity\" class=\"col-sm-3 col-form-label\">City</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputCity\" formControlName=\"city\">\n              <app-control-messages [control]=\"clientForm.controls.city\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"inputState\" class=\"col-sm-3 col-form-label\">State</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <!-- <input type=\"text\" class=\"form-control capitalize\" id=\"inputState\" formControlName=\"state\"> -->\n              <select class=\"form-control\" id=\"sel1\" formControlName=\"state\">\n                <option *ngFor=\"let state of clientService.states$\" [value]=\"state.id\" >{{state.name}}</option>\n\n              </select>\n              <app-control-messages [control]=\"clientForm.controls.state\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"inputPin\" class=\"col-sm-3 col-form-label\">Pin</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputPin\" formControlName=\"pin\">\n              <!-- <p style=\"color:red\" *ngIf=\"clientForm.controls.name.touched && clientForm.controls.name.errors.required\">Required</p> -->\n              <!-- <app-control-messages [control]=\"clientForm.controls.pin\"></app-control-messages> -->\n            </div>\n          </div>\n        </div>\n        <div class=\"form-check\">\n          <input type=\"checkbox\" class=\"form-check-input\" id=\"inputInvestor\" formControlName=\"is_investor\">\n          <label class=\"form-check-label\" for=\"inputInvestor\">Is Investor?</label>\n        </div>\n        <div class=\"form-group\" *ngIf=\"clientForm.controls.is_investor.value == true\">\n          <label class=\"col-sm-3 col-form-label\">Investment Records</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <table *ngIf=\"clientForm.controls.investment_records.length >=1\" class=\"table\" >\n                <thead class=\"#f5f5f5 grey lighten-4\">\n                  <tr>\n                    <th>Date</th>\n                    <th class=\"text-right\">Amount</th>\n                    <th class=\"text-center\">Void</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr  formArrayName=\"investment_records\"\n                  *ngFor=\"let item of clientForm.get('investment_records').controls; let i = index;\" >\n                  <td [formGroupName]=\"i\">  <input type=\"date\" class=\"form-control\" formControlName=\"date\" placeholder=\"Date\" [readonly]=\"item.controls.is_disabled.value == true\"></td>\n                  <td [formGroupName]=\"i\" class=\"text-right\">  <input type=\"text\" class=\"form-control text-right\" formControlName=\"amount\" placeholder=\"Amount\" [readonly]=\"item.controls.is_disabled.value == true\" (keyup)=\"formatCurrency(item.controls.amount)\"></td>\n                  <td [formGroupName]=\"i\" class=\"text-center\">\n                    <input *ngIf=\"item.controls.is_void_disabled.value == false\" type=\"checkbox\" class=\"form-check-input text-center\" formControlName=\"is_void\" >\n                    <span *ngIf=\"item.controls.is_void_disabled.value == true\">Void</span>\n                  </td>\n                </tr>\n                <tr class=\"bg-highlight\">\n                  <td><span class=\"bold\">TOTAL INVESTMENT</span></td>\n                  <td class=\"text-right\"><input type=\"text\" class=\"form-control border-none text-right\" formControlName=\"total_investment\" readonly></td>\n                  <td></td>\n                </tr>\n              </tbody>\n            </table>\n\n            <button type=\"button\" class=\"btn btn-custom\" (click) = \"addItem()\"><i class=\"fa fa-plus\"></i></button>\n          </div>\n        </div>\n      </div>\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n            <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"clientForm.controls.name.value\" (isDelete)=\"deleteClient($event)\"></app-simple-modal>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/client/client-form/client-form.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/components/client/client-form/client-form.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/client/client-form/client-form.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/client/client-form/client-form.component.ts ***!
  \************************************************************************/
/*! exports provided: ClientFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientFormComponent", function() { return ClientFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_client_client_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/client/client.service */ "./src/app/services/client/client.service.ts");
/* harmony import */ var app_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/common/common.service */ "./src/app/services/common/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClientFormComponent = /** @class */ (function () {
    function ClientFormComponent(fb, clientService, commonService, router, route) {
        this.fb = fb;
        this.clientService = clientService;
        this.commonService = commonService;
        this.router = router;
        this.route = route;
        this.title = "Create Client";
        this.module = "client";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    ClientFormComponent.prototype.createForm = function () {
        this.clientForm = this.fb.group({
            client_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(12)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            state: [],
            pin: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(10)],
            is_investor: [false],
            investment_records: this.fb.array([]),
            total_investment: [0],
            total_expenses: [0],
            available_balance: [0]
        });
    };
    ClientFormComponent.prototype.createInvestmentRecord = function () {
        return this.fb.group({
            date: [],
            amount: [],
            is_void: [false],
            is_disabled: [false],
            is_void_disabled: [false]
        });
    };
    ClientFormComponent.prototype.addItem = function () {
        var control = this.clientForm.controls['investment_records'];
        control.push(this.createInvestmentRecord());
    };
    ClientFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.clientForm.valid) {
            if (this.clientService.selectedMode == 'Create') {
                this.createClient();
            }
            else if (this.clientService.selectedMode == 'Edit' || this.clientService.selectedMode == 'Get') {
                this.updateClient();
            }
        }
    };
    ClientFormComponent.prototype.getClientById = function (client_id) {
        var _this = this;
        this.clientService.getClientById(client_id)
            .subscribe(function (res) {
            _this.patchForm(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    ClientFormComponent.prototype.patchForm = function (res) {
        var _this = this;
        //this.clientForm.patchValue(res);
        this.clientForm.patchValue({
            client_id: res.client_id,
            name: res.name,
            phone: res.phone,
            email: res.email,
            address: res.address,
            city: res.city,
            state: res.state,
            pin: res.pin,
            is_investor: res.is_investor,
            total_investment: res.total_investment
        });
        if (res.investment_records != null) {
            //Disable is_investor if investment records exist
            // this.clientForm.get('is_investor').disable();
            var control_1 = this.clientForm.controls.investment_records;
            //Clear Form Array
            while (control_1.length !== 0) {
                control_1.removeAt(0);
            }
            //Patch Investment Records Array
            res.investment_records.forEach(function (record) {
                var is_void_disabled = false;
                if (record.is_void == true) {
                    is_void_disabled = true;
                }
                control_1.push(_this.fb.group({ date: record.date, amount: record.amount, is_void: record.is_void, is_disabled: true, is_void_disabled: is_void_disabled }));
            });
        }
    };
    ClientFormComponent.prototype.createClient = function () {
        var _this = this;
        if (this.clientForm.controls.is_investor.value == true) {
            this.clientForm.patchValue({
                total_investment: this.getTotalInvestment(),
                available_balance: this.getTotalInvestment()
            });
        }
        this.clientService.createClient(this.clientForm.value)
            .subscribe(function (res) {
            _this.clientService.refreshList.next(true);
            _this.router.navigate(['/client/add']);
            _this.clientForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    ClientFormComponent.prototype.getTotalInvestment = function () {
        var total_investment = 0;
        this.clientForm.controls.investment_records.value.forEach(function (record) {
            if (record.is_void == false) {
                total_investment = total_investment + parseInt(record.amount.replace(/,/g, ""));
            }
        });
        return total_investment;
    };
    ClientFormComponent.prototype.updateClient = function () {
        var _this = this;
        var x = this.getTotalInvestment();
        var y = this.clientForm.controls.total_expenses.value;
        this.clientForm.patchValue({
            total_investment: x,
            available_balance: x - y,
        });
        this.clientService.updateClient(this.clientForm.value)
            .subscribe(function (res) {
            _this.clientService.refreshList.next(true);
            _this.router.navigate(['/client/add']);
        }, function (err) {
            console.log(err);
        });
    };
    ClientFormComponent.prototype.deleteClient = function (event) {
        var _this = this;
        if (this.selectedClient_Id) {
            this.clientService.deleteClient(this.selectedClient_Id).subscribe(function (res) {
                _this.clientService.refreshList.next(true);
                _this.router.navigate(['/client/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.clientForm.reset();
        }
    };
    ClientFormComponent.prototype.formatCurrency = function (control) {
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
    ClientFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.clientService.selectedClientId
            .subscribe(function (res) {
            _this.selectedClient_Id = res;
            if (_this.clientService.selectedMode == "Get") {
                _this.title = "Edit Client";
                _this.mode = "delete";
                _this.getClientById(res);
            }
        }, function (err) {
        });
    };
    ClientFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-client-form',
            template: __webpack_require__(/*! ./client-form.component.html */ "./src/app/components/client/client-form/client-form.component.html"),
            styles: [__webpack_require__(/*! ./client-form.component.scss */ "./src/app/components/client/client-form/client-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            app_services_client_client_service__WEBPACK_IMPORTED_MODULE_3__["ClientService"],
            app_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ClientFormComponent);
    return ClientFormComponent;
}());



/***/ }),

/***/ "./src/app/components/client/client-list/client-list.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/components/client/client-list/client-list.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchClients($event)\" (isCreate)=\"createClient('Create')\"></app-search>\n  </div>\n  <div>\n\n    <table class=\"table\">\n\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let client of results$ | async'>\n          <th scope=\"row\">{{client.client_id}}</th>\n          <td>{{client.name}}</td>\n          <td class=\"pointer\" type=\"button\" (click)=\"selectClient(client.client_id, 'Get')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/client/client-list/client-list.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/components/client/client-list/client-list.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/client/client-list/client-list.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/client/client-list/client-list.component.ts ***!
  \************************************************************************/
/*! exports provided: ClientListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientListComponent", function() { return ClientListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_client_client_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/client/client.service */ "./src/app/services/client/client.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientListComponent = /** @class */ (function () {
    function ClientListComponent(clientService, router, route) {
        this.clientService = clientService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ClientListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/client/add']);
    };
    ClientListComponent.prototype.searchClients = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    ClientListComponent.prototype.createClient = function (mode) {
        this.clientService.selectedMode = mode;
        this.router.navigate(['/client/add']);
    };
    //On Click of the Edit Button
    ClientListComponent.prototype.selectClient = function (client_id, mode) {
        var _this = this;
        this.clientService.selectedMode = mode;
        this.router.navigate(['/client/edit']);
        setTimeout(function () {
            _this.clientService.selectedClientId.next(client_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], ClientListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ClientListComponent.prototype, "searchTerm", void 0);
    ClientListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-client-list',
            template: __webpack_require__(/*! ./client-list.component.html */ "./src/app/components/client/client-list/client-list.component.html"),
            styles: [__webpack_require__(/*! ./client-list.component.scss */ "./src/app/components/client/client-list/client-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_client_client_service__WEBPACK_IMPORTED_MODULE_3__["ClientService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ClientListComponent);
    return ClientListComponent;
}());



/***/ }),

/***/ "./src/app/components/client/client-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/components/client/client-routing.module.ts ***!
  \************************************************************/
/*! exports provided: ClientRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientRoutingModule", function() { return ClientRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _client_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client.component */ "./src/app/components/client/client.component.ts");
/* harmony import */ var _client_list_client_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client-list/client-list.component */ "./src/app/components/client/client-list/client-list.component.ts");
/* harmony import */ var _client_form_client_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client-form/client-form.component */ "./src/app/components/client/client-form/client-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var clientRoutes = [
    {
        path: 'client',
        component: _client_component__WEBPACK_IMPORTED_MODULE_2__["ClientComponent"],
        children: [
            { path: 'list', component: _client_list_client_list_component__WEBPACK_IMPORTED_MODULE_3__["ClientListComponent"] },
            { path: 'add', component: _client_form_client_form_component__WEBPACK_IMPORTED_MODULE_4__["ClientFormComponent"] },
            { path: 'edit', component: _client_form_client_form_component__WEBPACK_IMPORTED_MODULE_4__["ClientFormComponent"] }
        ]
    }
];
var ClientRoutingModule = /** @class */ (function () {
    function ClientRoutingModule() {
    }
    ClientRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(clientRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ClientRoutingModule);
    return ClientRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/client/client.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/client/client.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n\n  <div class=\"col-4\">\n  <app-client-list (searchTerm)=\"searchClients($event)\" [results$]=\"clients$\"></app-client-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/client/client.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/client/client.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/client/client.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/client/client.component.ts ***!
  \*******************************************************/
/*! exports provided: ClientComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientComponent", function() { return ClientComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_client_client_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/client/client.service */ "./src/app/services/client/client.service.ts");
/* harmony import */ var app_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/services/common/common.service */ "./src/app/services/common/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ClientComponent = /** @class */ (function () {
    function ClientComponent(fb, clientService, commonService, router, route) {
        this.fb = fb;
        this.clientService = clientService;
        this.commonService = commonService;
        this.router = router;
        this.route = route;
        this.title = "Client";
        this.getStates();
    }
    ClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getClients();
        this.clientService.refreshList.subscribe(function (res) {
            _this.getClients();
        }, function (err) {
            console.log(err);
        });
    };
    ClientComponent.prototype.getClients = function () {
        this.clients$ = this.clientService.getClients();
    };
    ClientComponent.prototype.searchClients = function (searchTerm) {
        if (searchTerm) {
            this.clients$ = this.clientService.searchClients(searchTerm);
        }
        else {
            this.clients$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    ClientComponent.prototype.getStates = function () {
        var _this = this;
        this.commonService.getStates().subscribe(function (res) {
            _this.clientService.states$ = res.RestResponse.result;
        });
    };
    ClientComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-client',
            template: __webpack_require__(/*! ./client.component.html */ "./src/app/components/client/client.component.html"),
            styles: [__webpack_require__(/*! ./client.component.scss */ "./src/app/components/client/client.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_client_client_service__WEBPACK_IMPORTED_MODULE_4__["ClientService"], app_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ClientComponent);
    return ClientComponent;
}());



/***/ }),

/***/ "./src/app/services/common/common.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/common/common.service.ts ***!
  \***************************************************/
/*! exports provided: CommonService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonService", function() { return CommonService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
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
var CommonService = /** @class */ (function () {
    function CommonService(http) {
        this.http = http;
    }
    CommonService.prototype.getStates = function () {
        return this.http.get('http://services.groupkt.com/state/get/IND/all', { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    };
    CommonService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CommonService);
    return CommonService;
}());



/***/ })

}]);
//# sourceMappingURL=components-client-client-routing-module.js.map