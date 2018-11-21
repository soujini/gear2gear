(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-transmission-type-transmission-type-routing-module"],{

/***/ "./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.html":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"transmissionTypeForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputTransmissionTypeName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputTransmissionTypeName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"transmissionTypeForm.controls.name.touched && transmissionTypeForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"transmissionTypeForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"transmissionTypeForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"transmissionTypeForm.controls.name.value\" (isDelete)=\"deleteTransmissionType($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.scss":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: TransmissionTypeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmissionTypeFormComponent", function() { return TransmissionTypeFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/transmission-type/transmission-type.service */ "./src/app/services/transmission-type/transmission-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransmissionTypeFormComponent = /** @class */ (function () {
    function TransmissionTypeFormComponent(fb, transmissionTypeService, router, route) {
        this.fb = fb;
        this.transmissionTypeService = transmissionTypeService;
        this.router = router;
        this.route = route;
        this.title = "Create Transmission Type";
        this.module = "trasnmission type";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    TransmissionTypeFormComponent.prototype.createForm = function () {
        this.transmissionTypeForm = this.fb.group({
            transmission_type_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    TransmissionTypeFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.transmissionTypeForm.valid) {
            if (this.transmissionTypeService.selectedMode == 'Create') {
                this.createTransmissionType();
            }
            else if (this.transmissionTypeService.selectedMode == 'Edit') {
                this.updateTransmissionType();
            }
        }
    };
    TransmissionTypeFormComponent.prototype.getTransmissionTypeById = function (transmissionType_id) {
        var _this = this;
        this.transmissionTypeService.getTransmissionTypeById(transmissionType_id)
            .subscribe(function (res) {
            _this.transmissionTypeForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    TransmissionTypeFormComponent.prototype.createTransmissionType = function () {
        var _this = this;
        this.transmissionTypeService.createTransmissionType(this.transmissionTypeForm.value)
            .subscribe(function (res) {
            _this.transmissionTypeService.refreshList.next(true);
            _this.transmissionTypeForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    TransmissionTypeFormComponent.prototype.updateTransmissionType = function () {
        var _this = this;
        this.transmissionTypeService.updateTransmissionType(this.transmissionTypeForm.value)
            .subscribe(function (res) {
            _this.transmissionTypeService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    TransmissionTypeFormComponent.prototype.deleteTransmissionType = function (event) {
        var _this = this;
        if (this.selectedTransmissionType_Id) {
            this.transmissionTypeService.deleteTransmissionType(this.selectedTransmissionType_Id).subscribe(function (res) {
                _this.transmissionTypeService.refreshList.next(true);
                _this.router.navigate(['/transmissionType/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.transmissionTypeForm.reset();
        }
    };
    TransmissionTypeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.transmissionTypeService.selectedTransmissionTypeId
            .subscribe(function (res) {
            _this.selectedTransmissionType_Id = res;
            if (_this.transmissionTypeService.selectedMode == "Edit") {
                _this.title = "Edit Transmission Type";
                _this.mode = "delete";
                _this.getTransmissionTypeById(res);
            }
        }, function (err) {
        });
    };
    TransmissionTypeFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-transmissionType-form',
            template: __webpack_require__(/*! ./transmission-type-form.component.html */ "./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.html"),
            styles: [__webpack_require__(/*! ./transmission-type-form.component.scss */ "./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_3__["TransmissionTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TransmissionTypeFormComponent);
    return TransmissionTypeFormComponent;
}());



/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.html":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchTransmissionTypes($event)\" (isCreate)=\"createTransmissionType('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let transmissionType of results$ | async' [ngClass]=\"{'is-active': selectedTransmissionTypeId == transmissionType.transmission_type_id}\">\n          <th scope=\"row\">{{transmissionType.transmission_type_id}}</th>\n          <td>{{transmissionType.name}}</td>\n          <td class=\"pointer\" (click)=\"selectTransmissionType(transmissionType.transmission_type_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.scss":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: TransmissionTypeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmissionTypeListComponent", function() { return TransmissionTypeListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/transmission-type/transmission-type.service */ "./src/app/services/transmission-type/transmission-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransmissionTypeListComponent = /** @class */ (function () {
    function TransmissionTypeListComponent(transmissionTypeService, router, route) {
        this.transmissionTypeService = transmissionTypeService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    TransmissionTypeListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/transmissionType/add']);
    };
    TransmissionTypeListComponent.prototype.searchTransmissionTypes = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    TransmissionTypeListComponent.prototype.createTransmissionType = function (mode) {
        this.transmissionTypeService.selectedMode = mode;
        this.router.navigate(['/transmissionType/add']);
    };
    //On Click of the Edit Button
    TransmissionTypeListComponent.prototype.selectTransmissionType = function (transmissionType_id, mode) {
        var _this = this;
        this.selectedTransmissionTypeId = transmissionType_id;
        this.transmissionTypeService.selectedMode = mode;
        this.router.navigate(['/transmissionType/edit']);
        setTimeout(function () {
            _this.transmissionTypeService.selectedTransmissionTypeId.next(transmissionType_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], TransmissionTypeListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TransmissionTypeListComponent.prototype, "searchTerm", void 0);
    TransmissionTypeListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-transmissionType-list',
            template: __webpack_require__(/*! ./transmission-type-list.component.html */ "./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.html"),
            styles: [__webpack_require__(/*! ./transmission-type-list.component.scss */ "./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_3__["TransmissionTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TransmissionTypeListComponent);
    return TransmissionTypeListComponent;
}());



/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type-routing.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type-routing.module.ts ***!
  \**********************************************************************************/
/*! exports provided: TransmissionTypeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmissionTypeRoutingModule", function() { return TransmissionTypeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _transmission_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transmission-type.component */ "./src/app/components/transmission-type/transmission-type.component.ts");
/* harmony import */ var _transmission_type_list_transmission_type_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transmission-type-list/transmission-type-list.component */ "./src/app/components/transmission-type/transmission-type-list/transmission-type-list.component.ts");
/* harmony import */ var _transmission_type_form_transmission_type_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transmission-type-form/transmission-type-form.component */ "./src/app/components/transmission-type/transmission-type-form/transmission-type-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var transmissionTypeRoutes = [
    {
        path: 'transmissionType',
        component: _transmission_type_component__WEBPACK_IMPORTED_MODULE_2__["TransmissionTypeComponent"],
        children: [
            { path: 'list', component: _transmission_type_list_transmission_type_list_component__WEBPACK_IMPORTED_MODULE_3__["TransmissionTypeListComponent"] },
            { path: 'add', component: _transmission_type_form_transmission_type_form_component__WEBPACK_IMPORTED_MODULE_4__["TransmissionTypeFormComponent"] },
            { path: 'edit', component: _transmission_type_form_transmission_type_form_component__WEBPACK_IMPORTED_MODULE_4__["TransmissionTypeFormComponent"] }
        ]
    }
];
var TransmissionTypeRoutingModule = /** @class */ (function () {
    function TransmissionTypeRoutingModule() {
    }
    TransmissionTypeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(transmissionTypeRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TransmissionTypeRoutingModule);
    return TransmissionTypeRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-transmissionType-list (searchTerm)=\"searchTransmissionTypes($event)\" [results$]=\"transmissionTypes$\"></app-transmissionType-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/transmission-type/transmission-type.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/transmission-type/transmission-type.component.ts ***!
  \*****************************************************************************/
/*! exports provided: TransmissionTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmissionTypeComponent", function() { return TransmissionTypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/transmission-type/transmission-type.service */ "./src/app/services/transmission-type/transmission-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TransmissionTypeComponent = /** @class */ (function () {
    function TransmissionTypeComponent(fb, transmissionTypeService, router, route) {
        this.fb = fb;
        this.transmissionTypeService = transmissionTypeService;
        this.router = router;
        this.route = route;
        this.title = "Transmission Type";
    }
    TransmissionTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTransmissionTypes();
        this.transmissionTypeService.refreshList.subscribe(function (res) {
            _this.getTransmissionTypes();
        }, function (err) {
            console.log(err);
        });
    };
    TransmissionTypeComponent.prototype.getTransmissionTypes = function () {
        this.transmissionTypes$ = this.transmissionTypeService.getTransmissionTypes();
    };
    TransmissionTypeComponent.prototype.searchTransmissionTypes = function (searchTerm) {
        if (searchTerm) {
            this.transmissionTypes$ = this.transmissionTypeService.searchTransmissionTypes(searchTerm);
        }
        else {
            this.transmissionTypes$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    TransmissionTypeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-make',
            template: __webpack_require__(/*! ./transmission-type.component.html */ "./src/app/components/transmission-type/transmission-type.component.html"),
            styles: [__webpack_require__(/*! ./transmission-type.component.scss */ "./src/app/components/transmission-type/transmission-type.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_transmission_type_transmission_type_service__WEBPACK_IMPORTED_MODULE_4__["TransmissionTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], TransmissionTypeComponent);
    return TransmissionTypeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-transmission-type-transmission-type-routing-module.js.map