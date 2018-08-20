(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-fuel-type-fuel-type-routing-module"],{

/***/ "./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"fuelTypeForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputFuelTypeName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputFuelTypeName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"fuelTypeForm.controls.name.touched && fuelTypeForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"fuelTypeForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"fuelTypeForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"fuelTypeForm.controls.name.value\" (isDelete)=\"deleteFuelType($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.ts ***!
  \*********************************************************************************/
/*! exports provided: FuelTypeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuelTypeFormComponent", function() { return FuelTypeFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/fuel-type/fuel-type.service */ "./src/app/services/fuel-type/fuel-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FuelTypeFormComponent = /** @class */ (function () {
    function FuelTypeFormComponent(fb, fuelTypeService, router, route) {
        this.fb = fb;
        this.fuelTypeService = fuelTypeService;
        this.router = router;
        this.route = route;
        this.title = "Create Fuel Type";
        this.module = "fuel type";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    FuelTypeFormComponent.prototype.createForm = function () {
        this.fuelTypeForm = this.fb.group({
            fuel_type_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    FuelTypeFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.fuelTypeForm.valid) {
            if (this.fuelTypeService.selectedMode == 'Create') {
                this.createFuelType();
            }
            else if (this.fuelTypeService.selectedMode == 'Edit') {
                this.updateFuelType();
            }
        }
    };
    FuelTypeFormComponent.prototype.getFuelTypeById = function (fuelType_id) {
        var _this = this;
        this.fuelTypeService.getFuelTypeById(fuelType_id)
            .subscribe(function (res) {
            _this.fuelTypeForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    FuelTypeFormComponent.prototype.createFuelType = function () {
        var _this = this;
        this.fuelTypeService.createFuelType(this.fuelTypeForm.value)
            .subscribe(function (res) {
            _this.fuelTypeService.refreshList.next(true);
            _this.fuelTypeForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    FuelTypeFormComponent.prototype.updateFuelType = function () {
        var _this = this;
        this.fuelTypeService.updateFuelType(this.fuelTypeForm.value)
            .subscribe(function (res) {
            _this.fuelTypeService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    FuelTypeFormComponent.prototype.deleteFuelType = function (event) {
        var _this = this;
        if (this.selectedFuelType_Id) {
            this.fuelTypeService.deleteFuelType(this.selectedFuelType_Id).subscribe(function (res) {
                _this.fuelTypeService.refreshList.next(true);
                _this.router.navigate(['/fuelType/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.fuelTypeForm.reset();
        }
    };
    FuelTypeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.fuelTypeService.selectedFuelTypeId
            .subscribe(function (res) {
            _this.selectedFuelType_Id = res;
            if (_this.fuelTypeService.selectedMode == "Edit") {
                _this.title = "Edit Fuel Type";
                _this.mode = "delete";
                _this.getFuelTypeById(res);
            }
        }, function (err) {
        });
    };
    FuelTypeFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-fuelType-form',
            template: __webpack_require__(/*! ./fuel-type-form.component.html */ "./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.html"),
            styles: [__webpack_require__(/*! ./fuel-type-form.component.scss */ "./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_3__["FuelTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], FuelTypeFormComponent);
    return FuelTypeFormComponent;
}());



/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchFuelTypes($event)\" (isCreate)=\"createFuelType('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let fuelType of results$ | async'>\n          <th scope=\"row\">{{fuelType.fuel_type_id}}</th>\n          <td>{{fuelType.name}}</td>\n          <td class=\"pointer\" (click)=\"selectFuelType(fuelType.fuel_type_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.ts ***!
  \*********************************************************************************/
/*! exports provided: FuelTypeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuelTypeListComponent", function() { return FuelTypeListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/fuel-type/fuel-type.service */ "./src/app/services/fuel-type/fuel-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FuelTypeListComponent = /** @class */ (function () {
    function FuelTypeListComponent(fuelTypeService, router, route) {
        this.fuelTypeService = fuelTypeService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    FuelTypeListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/fuelType/add']);
    };
    FuelTypeListComponent.prototype.searchFuelTypes = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    FuelTypeListComponent.prototype.createFuelType = function (mode) {
        this.fuelTypeService.selectedMode = mode;
        this.router.navigate(['/fuelType/add']);
    };
    //On Click of the Edit Button
    FuelTypeListComponent.prototype.selectFuelType = function (fuelType_id, mode) {
        var _this = this;
        this.fuelTypeService.selectedMode = mode;
        this.router.navigate(['/fuelType/edit']);
        setTimeout(function () {
            _this.fuelTypeService.selectedFuelTypeId.next(fuelType_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], FuelTypeListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FuelTypeListComponent.prototype, "searchTerm", void 0);
    FuelTypeListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-fuelType-list',
            template: __webpack_require__(/*! ./fuel-type-list.component.html */ "./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.html"),
            styles: [__webpack_require__(/*! ./fuel-type-list.component.scss */ "./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_3__["FuelTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], FuelTypeListComponent);
    return FuelTypeListComponent;
}());



/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: FuelTypeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuelTypeRoutingModule", function() { return FuelTypeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _fuel_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fuel-type.component */ "./src/app/components/fuel-type/fuel-type.component.ts");
/* harmony import */ var _fuel_type_list_fuel_type_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fuel-type-list/fuel-type-list.component */ "./src/app/components/fuel-type/fuel-type-list/fuel-type-list.component.ts");
/* harmony import */ var _fuel_type_form_fuel_type_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fuel-type-form/fuel-type-form.component */ "./src/app/components/fuel-type/fuel-type-form/fuel-type-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var fuelTypeRoutes = [
    {
        path: 'fuelType',
        component: _fuel_type_component__WEBPACK_IMPORTED_MODULE_2__["FuelTypeComponent"],
        children: [
            { path: 'list', component: _fuel_type_list_fuel_type_list_component__WEBPACK_IMPORTED_MODULE_3__["FuelTypeListComponent"] },
            { path: 'add', component: _fuel_type_form_fuel_type_form_component__WEBPACK_IMPORTED_MODULE_4__["FuelTypeFormComponent"] },
            { path: 'edit', component: _fuel_type_form_fuel_type_form_component__WEBPACK_IMPORTED_MODULE_4__["FuelTypeFormComponent"] }
        ]
    }
];
var FuelTypeRoutingModule = /** @class */ (function () {
    function FuelTypeRoutingModule() {
    }
    FuelTypeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(fuelTypeRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], FuelTypeRoutingModule);
    return FuelTypeRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-fuelType-list (searchTerm)=\"searchFuelTypes($event)\" [results$]=\"fuelTypes$\"></app-fuelType-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/fuel-type/fuel-type.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/fuel-type/fuel-type.component.ts ***!
  \*************************************************************/
/*! exports provided: FuelTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuelTypeComponent", function() { return FuelTypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/fuel-type/fuel-type.service */ "./src/app/services/fuel-type/fuel-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FuelTypeComponent = /** @class */ (function () {
    function FuelTypeComponent(fb, fuelTypeService, router, route) {
        this.fb = fb;
        this.fuelTypeService = fuelTypeService;
        this.router = router;
        this.route = route;
        this.title = "Fuel Type";
    }
    FuelTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getFuelTypes();
        this.fuelTypeService.refreshList.subscribe(function (res) {
            _this.getFuelTypes();
        }, function (err) {
            console.log(err);
        });
    };
    FuelTypeComponent.prototype.getFuelTypes = function () {
        this.fuelTypes$ = this.fuelTypeService.getFuelTypes();
    };
    FuelTypeComponent.prototype.searchFuelTypes = function (searchTerm) {
        if (searchTerm) {
            this.fuelTypes$ = this.fuelTypeService.searchFuelTypes(searchTerm);
        }
        else {
            this.fuelTypes$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    FuelTypeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-make',
            template: __webpack_require__(/*! ./fuel-type.component.html */ "./src/app/components/fuel-type/fuel-type.component.html"),
            styles: [__webpack_require__(/*! ./fuel-type.component.scss */ "./src/app/components/fuel-type/fuel-type.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_fuel_type_fuel_type_service__WEBPACK_IMPORTED_MODULE_4__["FuelTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], FuelTypeComponent);
    return FuelTypeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-fuel-type-fuel-type-routing-module.js.map