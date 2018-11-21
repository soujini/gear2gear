(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-insurance-insurance-routing-module"],{

/***/ "./src/app/components/insurance/insurance-form/insurance-form.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/components/insurance/insurance-form/insurance-form.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"insuranceForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputInsuranceName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputInsuranceName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"insuranceForm.controls.name.touched && insuranceForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"insuranceForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"insuranceForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"insuranceForm.controls.name.value\" (isDelete)=\"deleteInsurance($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/insurance/insurance-form/insurance-form.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/components/insurance/insurance-form/insurance-form.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/insurance/insurance-form/insurance-form.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/insurance/insurance-form/insurance-form.component.ts ***!
  \*********************************************************************************/
/*! exports provided: InsuranceFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceFormComponent", function() { return InsuranceFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/insurance/insurance.service */ "./src/app/services/insurance/insurance.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InsuranceFormComponent = /** @class */ (function () {
    function InsuranceFormComponent(fb, insuranceService, router, route) {
        this.fb = fb;
        this.insuranceService = insuranceService;
        this.router = router;
        this.route = route;
        this.title = "Create Insurance";
        this.module = "insurance";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    InsuranceFormComponent.prototype.createForm = function () {
        this.insuranceForm = this.fb.group({
            insurance_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    InsuranceFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.insuranceForm.valid) {
            if (this.insuranceService.selectedMode == 'Create') {
                this.createInsurance();
            }
            else if (this.insuranceService.selectedMode == 'Edit') {
                this.updateInsurance();
            }
        }
    };
    InsuranceFormComponent.prototype.getInsuranceById = function (insurance_id) {
        var _this = this;
        this.insuranceService.getInsuranceById(insurance_id)
            .subscribe(function (res) {
            _this.insuranceForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceFormComponent.prototype.createInsurance = function () {
        var _this = this;
        this.insuranceService.createInsurance(this.insuranceForm.value)
            .subscribe(function (res) {
            _this.insuranceService.refreshList.next(true);
            _this.insuranceForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceFormComponent.prototype.updateInsurance = function () {
        var _this = this;
        this.insuranceService.updateInsurance(this.insuranceForm.value)
            .subscribe(function (res) {
            _this.insuranceService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceFormComponent.prototype.deleteInsurance = function (event) {
        var _this = this;
        if (this.selectedInsurance_Id) {
            this.insuranceService.deleteInsurance(this.selectedInsurance_Id).subscribe(function (res) {
                _this.insuranceService.refreshList.next(true);
                _this.router.navigate(['/insurance/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.insuranceForm.reset();
        }
    };
    InsuranceFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.insuranceService.selectedInsuranceId
            .subscribe(function (res) {
            _this.selectedInsurance_Id = res;
            if (_this.insuranceService.selectedMode == "Edit") {
                _this.title = "Edit Insurance";
                _this.mode = "delete";
                _this.getInsuranceById(res);
            }
        }, function (err) {
        });
    };
    InsuranceFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insurance-form',
            template: __webpack_require__(/*! ./insurance-form.component.html */ "./src/app/components/insurance/insurance-form/insurance-form.component.html"),
            styles: [__webpack_require__(/*! ./insurance-form.component.scss */ "./src/app/components/insurance/insurance-form/insurance-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_3__["InsuranceService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], InsuranceFormComponent);
    return InsuranceFormComponent;
}());



/***/ }),

/***/ "./src/app/components/insurance/insurance-list/insurance-list.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/components/insurance/insurance-list/insurance-list.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchInsurances($event)\" (isCreate)=\"createInsurance('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let insurance of results$ | async' [ngClass]=\"{'is-active': selectedInsuranceId == insurance.insurance_id}\">\n          <th scope=\"row\">{{insurance.insurance_id}}</th>\n          <td>{{insurance.name}}</td>\n          <td class=\"pointer\" (click)=\"selectInsurance(insurance.insurance_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/insurance/insurance-list/insurance-list.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/components/insurance/insurance-list/insurance-list.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/insurance/insurance-list/insurance-list.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/insurance/insurance-list/insurance-list.component.ts ***!
  \*********************************************************************************/
/*! exports provided: InsuranceListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceListComponent", function() { return InsuranceListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/insurance/insurance.service */ "./src/app/services/insurance/insurance.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InsuranceListComponent = /** @class */ (function () {
    function InsuranceListComponent(insuranceService, router, route) {
        this.insuranceService = insuranceService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    InsuranceListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/insurance/add']);
    };
    InsuranceListComponent.prototype.searchInsurances = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    InsuranceListComponent.prototype.createInsurance = function (mode) {
        this.insuranceService.selectedMode = mode;
        this.router.navigate(['/insurance/add']);
    };
    //On Click of the Edit Button
    InsuranceListComponent.prototype.selectInsurance = function (insurance_id, mode) {
        var _this = this;
        this.selectedInsuranceId = insurance_id;
        this.insuranceService.selectedMode = mode;
        this.router.navigate(['/insurance/edit']);
        setTimeout(function () {
            _this.insuranceService.selectedInsuranceId.next(insurance_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], InsuranceListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], InsuranceListComponent.prototype, "searchTerm", void 0);
    InsuranceListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insurance-list',
            template: __webpack_require__(/*! ./insurance-list.component.html */ "./src/app/components/insurance/insurance-list/insurance-list.component.html"),
            styles: [__webpack_require__(/*! ./insurance-list.component.scss */ "./src/app/components/insurance/insurance-list/insurance-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_3__["InsuranceService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], InsuranceListComponent);
    return InsuranceListComponent;
}());



/***/ }),

/***/ "./src/app/components/insurance/insurance-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/insurance/insurance-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: InsuranceRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceRoutingModule", function() { return InsuranceRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _insurance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insurance.component */ "./src/app/components/insurance/insurance.component.ts");
/* harmony import */ var _insurance_list_insurance_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insurance-list/insurance-list.component */ "./src/app/components/insurance/insurance-list/insurance-list.component.ts");
/* harmony import */ var _insurance_form_insurance_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./insurance-form/insurance-form.component */ "./src/app/components/insurance/insurance-form/insurance-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var insuranceRoutes = [
    {
        path: 'insurance',
        component: _insurance_component__WEBPACK_IMPORTED_MODULE_2__["InsuranceComponent"],
        children: [
            { path: 'list', component: _insurance_list_insurance_list_component__WEBPACK_IMPORTED_MODULE_3__["InsuranceListComponent"] },
            { path: 'add', component: _insurance_form_insurance_form_component__WEBPACK_IMPORTED_MODULE_4__["InsuranceFormComponent"] },
            { path: 'edit', component: _insurance_form_insurance_form_component__WEBPACK_IMPORTED_MODULE_4__["InsuranceFormComponent"] }
        ]
    }
];
var InsuranceRoutingModule = /** @class */ (function () {
    function InsuranceRoutingModule() {
    }
    InsuranceRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(insuranceRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], InsuranceRoutingModule);
    return InsuranceRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/insurance/insurance.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/insurance/insurance.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-insurance-list (searchTerm)=\"searchInsurances($event)\" [results$]=\"insurances$\"></app-insurance-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/insurance/insurance.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/components/insurance/insurance.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/insurance/insurance.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/insurance/insurance.component.ts ***!
  \*************************************************************/
/*! exports provided: InsuranceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceComponent", function() { return InsuranceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/insurance/insurance.service */ "./src/app/services/insurance/insurance.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InsuranceComponent = /** @class */ (function () {
    function InsuranceComponent(fb, insuranceService, router, route) {
        this.fb = fb;
        this.insuranceService = insuranceService;
        this.router = router;
        this.route = route;
        this.title = "Insurance";
    }
    InsuranceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getInsurances();
        this.insuranceService.refreshList.subscribe(function (res) {
            _this.getInsurances();
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceComponent.prototype.getInsurances = function () {
        this.insurances$ = this.insuranceService.getInsurances();
    };
    InsuranceComponent.prototype.searchInsurances = function (searchTerm) {
        if (searchTerm) {
            this.insurances$ = this.insuranceService.searchInsurances(searchTerm);
        }
        else {
            this.insurances$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    InsuranceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insurance',
            template: __webpack_require__(/*! ./insurance.component.html */ "./src/app/components/insurance/insurance.component.html"),
            styles: [__webpack_require__(/*! ./insurance.component.scss */ "./src/app/components/insurance/insurance.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_insurance_insurance_service__WEBPACK_IMPORTED_MODULE_4__["InsuranceService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], InsuranceComponent);
    return InsuranceComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-insurance-insurance-routing-module.js.map