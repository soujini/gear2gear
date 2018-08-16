(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-variant-variant-routing-module"],{

/***/ "./src/app/components/variant/variant-form/variant-form.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/components/variant/variant-form/variant-form.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"variantForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputVariantName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputVariantName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"variantForm.controls.name.touched && variantForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"variantForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"variantForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"variantForm.controls.name.value\" (isDelete)=\"deleteVariant($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/variant/variant-form/variant-form.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/components/variant/variant-form/variant-form.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/variant/variant-form/variant-form.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/variant/variant-form/variant-form.component.ts ***!
  \***************************************************************************/
/*! exports provided: VariantFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariantFormComponent", function() { return VariantFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/variant/variant.service */ "./src/app/services/variant/variant.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VariantFormComponent = /** @class */ (function () {
    function VariantFormComponent(fb, variantService, router, route) {
        this.fb = fb;
        this.variantService = variantService;
        this.router = router;
        this.route = route;
        this.title = "Create Variant";
        this.module = "variant";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    VariantFormComponent.prototype.createForm = function () {
        this.variantForm = this.fb.group({
            variant_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    VariantFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.variantForm.valid) {
            if (this.variantService.selectedMode == 'Create') {
                this.createVariant();
            }
            else if (this.variantService.selectedMode == 'Edit') {
                this.updateVariant();
            }
        }
    };
    VariantFormComponent.prototype.getVariantById = function (variant_id) {
        var _this = this;
        this.variantService.getVariantById(variant_id)
            .subscribe(function (res) {
            _this.variantForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    VariantFormComponent.prototype.createVariant = function () {
        var _this = this;
        this.variantService.createVariant(this.variantForm.value)
            .subscribe(function (res) {
            _this.variantService.refreshList.next(true);
            _this.variantForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    VariantFormComponent.prototype.updateVariant = function () {
        var _this = this;
        this.variantService.updateVariant(this.variantForm.value)
            .subscribe(function (res) {
            _this.variantService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    VariantFormComponent.prototype.deleteVariant = function (event) {
        var _this = this;
        if (this.selectedVariant_Id) {
            this.variantService.deleteVariant(this.selectedVariant_Id).subscribe(function (res) {
                _this.variantService.refreshList.next(true);
                _this.router.navigate(['/variant/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.variantForm.reset();
        }
    };
    VariantFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.variantService.selectedVariantId
            .subscribe(function (res) {
            _this.selectedVariant_Id = res;
            if (_this.variantService.selectedMode == "Edit") {
                _this.title = "Edit Variant";
                _this.mode = "delete";
                _this.getVariantById(res);
            }
        }, function (err) {
        });
    };
    VariantFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-variant-form',
            template: __webpack_require__(/*! ./variant-form.component.html */ "./src/app/components/variant/variant-form/variant-form.component.html"),
            styles: [__webpack_require__(/*! ./variant-form.component.scss */ "./src/app/components/variant/variant-form/variant-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_3__["VariantService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VariantFormComponent);
    return VariantFormComponent;
}());



/***/ }),

/***/ "./src/app/components/variant/variant-list/variant-list.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/components/variant/variant-list/variant-list.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchVariants($event)\" (isCreate)=\"createVariant('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let variant of results$ | async'>\n          <th scope=\"row\">{{variant.variant_id}}</th>\n          <td>{{variant.name}}</td>\n          <td class=\"pointer\" (click)=\"selectVariant(variant.variant_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/variant/variant-list/variant-list.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/components/variant/variant-list/variant-list.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/variant/variant-list/variant-list.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/variant/variant-list/variant-list.component.ts ***!
  \***************************************************************************/
/*! exports provided: VariantListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariantListComponent", function() { return VariantListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/variant/variant.service */ "./src/app/services/variant/variant.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VariantListComponent = /** @class */ (function () {
    function VariantListComponent(variantService, router, route) {
        this.variantService = variantService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    VariantListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/variant/add']);
    };
    VariantListComponent.prototype.searchVariants = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    VariantListComponent.prototype.createVariant = function (mode) {
        this.variantService.selectedMode = mode;
        this.router.navigate(['/variant/add']);
    };
    //On Click of the Edit Button
    VariantListComponent.prototype.selectVariant = function (variant_id, mode) {
        var _this = this;
        this.variantService.selectedMode = mode;
        this.router.navigate(['/variant/edit']);
        setTimeout(function () {
            _this.variantService.selectedVariantId.next(variant_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], VariantListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], VariantListComponent.prototype, "searchTerm", void 0);
    VariantListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-variant-list',
            template: __webpack_require__(/*! ./variant-list.component.html */ "./src/app/components/variant/variant-list/variant-list.component.html"),
            styles: [__webpack_require__(/*! ./variant-list.component.scss */ "./src/app/components/variant/variant-list/variant-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_3__["VariantService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VariantListComponent);
    return VariantListComponent;
}());



/***/ }),

/***/ "./src/app/components/variant/variant-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/components/variant/variant-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: VariantRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariantRoutingModule", function() { return VariantRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _variant_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variant.component */ "./src/app/components/variant/variant.component.ts");
/* harmony import */ var _variant_list_variant_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./variant-list/variant-list.component */ "./src/app/components/variant/variant-list/variant-list.component.ts");
/* harmony import */ var _variant_form_variant_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variant-form/variant-form.component */ "./src/app/components/variant/variant-form/variant-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var variantRoutes = [
    {
        path: 'variant',
        component: _variant_component__WEBPACK_IMPORTED_MODULE_2__["VariantComponent"],
        children: [
            { path: 'list', component: _variant_list_variant_list_component__WEBPACK_IMPORTED_MODULE_3__["VariantListComponent"] },
            { path: 'add', component: _variant_form_variant_form_component__WEBPACK_IMPORTED_MODULE_4__["VariantFormComponent"] },
            { path: 'edit', component: _variant_form_variant_form_component__WEBPACK_IMPORTED_MODULE_4__["VariantFormComponent"] }
        ]
    }
];
var VariantRoutingModule = /** @class */ (function () {
    function VariantRoutingModule() {
    }
    VariantRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(variantRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], VariantRoutingModule);
    return VariantRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/variant/variant.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/variant/variant.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-variant-list (searchTerm)=\"searchVariants($event)\" [results$]=\"variants$\"></app-variant-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/variant/variant.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/variant/variant.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/variant/variant.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/variant/variant.component.ts ***!
  \*********************************************************/
/*! exports provided: VariantComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariantComponent", function() { return VariantComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/variant/variant.service */ "./src/app/services/variant/variant.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VariantComponent = /** @class */ (function () {
    function VariantComponent(fb, variantService, router, route) {
        this.fb = fb;
        this.variantService = variantService;
        this.router = router;
        this.route = route;
        this.title = "Variant";
    }
    VariantComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getVariants();
        this.variantService.refreshList.subscribe(function (res) {
            _this.getVariants();
        }, function (err) {
            console.log(err);
        });
    };
    VariantComponent.prototype.getVariants = function () {
        this.variants$ = this.variantService.getVariants();
    };
    VariantComponent.prototype.searchVariants = function (searchTerm) {
        if (searchTerm) {
            this.variants$ = this.variantService.searchVariants(searchTerm);
        }
        else {
            this.variants$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    VariantComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-variant',
            template: __webpack_require__(/*! ./variant.component.html */ "./src/app/components/variant/variant.component.html"),
            styles: [__webpack_require__(/*! ./variant.component.scss */ "./src/app/components/variant/variant.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_variant_variant_service__WEBPACK_IMPORTED_MODULE_4__["VariantService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], VariantComponent);
    return VariantComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-variant-variant-routing-module.js.map