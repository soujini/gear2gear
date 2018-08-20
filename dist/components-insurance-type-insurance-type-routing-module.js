(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-insurance-type-insurance-type-routing-module"],{

/***/ "./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"insuranceTypeForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputInsuranceTypeName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputInsuranceTypeName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"insuranceTypeForm.controls.name.touched && insuranceTypeForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"insuranceTypeForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"insuranceTypeForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"insuranceTypeForm.controls.name.value\" (isDelete)=\"deleteInsuranceType($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.ts ***!
  \************************************************************************************************/
/*! exports provided: InsuranceTypeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceTypeFormComponent", function() { return InsuranceTypeFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/insurance-type/insurance-type.service */ "./src/app/services/insurance-type/insurance-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InsuranceTypeFormComponent = /** @class */ (function () {
    function InsuranceTypeFormComponent(fb, insuranceTypeService, router, route) {
        this.fb = fb;
        this.insuranceTypeService = insuranceTypeService;
        this.router = router;
        this.route = route;
        this.title = "Create Insurance Type";
        this.module = "insurance type";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    InsuranceTypeFormComponent.prototype.createForm = function () {
        this.insuranceTypeForm = this.fb.group({
            insurance_type_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    InsuranceTypeFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.insuranceTypeForm.valid) {
            if (this.insuranceTypeService.selectedMode == 'Create') {
                this.createInsuranceType();
            }
            else if (this.insuranceTypeService.selectedMode == 'Edit') {
                this.updateInsuranceType();
            }
        }
    };
    InsuranceTypeFormComponent.prototype.getInsuranceTypeById = function (insuranceType_id) {
        var _this = this;
        this.insuranceTypeService.getInsuranceTypeById(insuranceType_id)
            .subscribe(function (res) {
            _this.insuranceTypeForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceTypeFormComponent.prototype.createInsuranceType = function () {
        var _this = this;
        this.insuranceTypeService.createInsuranceType(this.insuranceTypeForm.value)
            .subscribe(function (res) {
            _this.insuranceTypeService.refreshList.next(true);
            _this.insuranceTypeForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceTypeFormComponent.prototype.updateInsuranceType = function () {
        var _this = this;
        this.insuranceTypeService.updateInsuranceType(this.insuranceTypeForm.value)
            .subscribe(function (res) {
            _this.insuranceTypeService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceTypeFormComponent.prototype.deleteInsuranceType = function (event) {
        var _this = this;
        if (this.selectedInsuranceType_Id) {
            this.insuranceTypeService.deleteInsuranceType(this.selectedInsuranceType_Id).subscribe(function (res) {
                _this.insuranceTypeService.refreshList.next(true);
                _this.router.navigate(['/insuranceType/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.insuranceTypeForm.reset();
        }
    };
    InsuranceTypeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.insuranceTypeService.selectedInsuranceTypeId
            .subscribe(function (res) {
            _this.selectedInsuranceType_Id = res;
            if (_this.insuranceTypeService.selectedMode == "Edit") {
                _this.title = "Edit Insurance Type";
                _this.mode = "delete";
                _this.getInsuranceTypeById(res);
            }
        }, function (err) {
        });
    };
    InsuranceTypeFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insuranceType-form',
            template: __webpack_require__(/*! ./insurance-type-form.component.html */ "./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.html"),
            styles: [__webpack_require__(/*! ./insurance-type-form.component.scss */ "./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_3__["InsuranceTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], InsuranceTypeFormComponent);
    return InsuranceTypeFormComponent;
}());



/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchInsuranceTypes($event)\" (isCreate)=\"createInsuranceType('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let insuranceType of results$ | async'>\n          <th scope=\"row\">{{insuranceType.insurance_type_id}}</th>\n          <td>{{insuranceType.name}}</td>\n          <td class=\"pointer\" (click)=\"selectInsuranceType(insuranceType.insurance_type_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.ts ***!
  \************************************************************************************************/
/*! exports provided: InsuranceTypeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceTypeListComponent", function() { return InsuranceTypeListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/insurance-type/insurance-type.service */ "./src/app/services/insurance-type/insurance-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InsuranceTypeListComponent = /** @class */ (function () {
    function InsuranceTypeListComponent(insuranceTypeService, router, route) {
        this.insuranceTypeService = insuranceTypeService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    InsuranceTypeListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/insuranceType/add']);
    };
    InsuranceTypeListComponent.prototype.searchInsuranceTypes = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    InsuranceTypeListComponent.prototype.createInsuranceType = function (mode) {
        this.insuranceTypeService.selectedMode = mode;
        this.router.navigate(['/insuranceType/add']);
    };
    //On Click of the Edit Button
    InsuranceTypeListComponent.prototype.selectInsuranceType = function (insuranceType_id, mode) {
        var _this = this;
        this.insuranceTypeService.selectedMode = mode;
        this.router.navigate(['/insuranceType/edit']);
        setTimeout(function () {
            _this.insuranceTypeService.selectedInsuranceTypeId.next(insuranceType_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], InsuranceTypeListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], InsuranceTypeListComponent.prototype, "searchTerm", void 0);
    InsuranceTypeListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insuranceType-list',
            template: __webpack_require__(/*! ./insurance-type-list.component.html */ "./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.html"),
            styles: [__webpack_require__(/*! ./insurance-type-list.component.scss */ "./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_3__["InsuranceTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], InsuranceTypeListComponent);
    return InsuranceTypeListComponent;
}());



/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type-routing.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type-routing.module.ts ***!
  \****************************************************************************/
/*! exports provided: InsuranceTypeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceTypeRoutingModule", function() { return InsuranceTypeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _insurance_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insurance-type.component */ "./src/app/components/insurance-type/insurance-type.component.ts");
/* harmony import */ var _insurance_type_list_insurance_type_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insurance-type-list/insurance-type-list.component */ "./src/app/components/insurance-type/insurance-type-list/insurance-type-list.component.ts");
/* harmony import */ var _insurance_type_form_insurance_type_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./insurance-type-form/insurance-type-form.component */ "./src/app/components/insurance-type/insurance-type-form/insurance-type-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var insuranceTypeRoutes = [
    {
        path: 'insuranceType',
        component: _insurance_type_component__WEBPACK_IMPORTED_MODULE_2__["InsuranceTypeComponent"],
        children: [
            { path: 'list', component: _insurance_type_list_insurance_type_list_component__WEBPACK_IMPORTED_MODULE_3__["InsuranceTypeListComponent"] },
            { path: 'add', component: _insurance_type_form_insurance_type_form_component__WEBPACK_IMPORTED_MODULE_4__["InsuranceTypeFormComponent"] },
            { path: 'edit', component: _insurance_type_form_insurance_type_form_component__WEBPACK_IMPORTED_MODULE_4__["InsuranceTypeFormComponent"] }
        ]
    }
];
var InsuranceTypeRoutingModule = /** @class */ (function () {
    function InsuranceTypeRoutingModule() {
    }
    InsuranceTypeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(insuranceTypeRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], InsuranceTypeRoutingModule);
    return InsuranceTypeRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-insuranceType-list (searchTerm)=\"searchInsuranceTypes($event)\" [results$]=\"insuranceTypes$\"></app-insuranceType-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/insurance-type/insurance-type.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/insurance-type/insurance-type.component.ts ***!
  \***********************************************************************/
/*! exports provided: InsuranceTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceTypeComponent", function() { return InsuranceTypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/insurance-type/insurance-type.service */ "./src/app/services/insurance-type/insurance-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InsuranceTypeComponent = /** @class */ (function () {
    function InsuranceTypeComponent(fb, insuranceTypeService, router, route) {
        this.fb = fb;
        this.insuranceTypeService = insuranceTypeService;
        this.router = router;
        this.route = route;
        this.title = "Insurance Type";
    }
    InsuranceTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getInsuranceTypes();
        this.insuranceTypeService.refreshList.subscribe(function (res) {
            _this.getInsuranceTypes();
        }, function (err) {
            console.log(err);
        });
    };
    InsuranceTypeComponent.prototype.getInsuranceTypes = function () {
        this.insuranceTypes$ = this.insuranceTypeService.getInsuranceTypes();
    };
    InsuranceTypeComponent.prototype.searchInsuranceTypes = function (searchTerm) {
        if (searchTerm) {
            this.insuranceTypes$ = this.insuranceTypeService.searchInsuranceTypes(searchTerm);
        }
        else {
            this.insuranceTypes$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    InsuranceTypeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-make',
            template: __webpack_require__(/*! ./insurance-type.component.html */ "./src/app/components/insurance-type/insurance-type.component.html"),
            styles: [__webpack_require__(/*! ./insurance-type.component.scss */ "./src/app/components/insurance-type/insurance-type.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_insurance_type_insurance_type_service__WEBPACK_IMPORTED_MODULE_4__["InsuranceTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], InsuranceTypeComponent);
    return InsuranceTypeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-insurance-type-insurance-type-routing-module.js.map