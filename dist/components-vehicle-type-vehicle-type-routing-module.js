(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-vehicle-type-vehicle-type-routing-module"],{

/***/ "./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"vehicleTypeForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputVehicleTypeName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputVehicleTypeName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"vehicleTypeForm.controls.name.touched && vehicleTypeForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"vehicleTypeForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"vehicleTypeForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"vehicleTypeForm.controls.name.value\" (isDelete)=\"deleteVehicleType($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.ts ***!
  \******************************************************************************************/
/*! exports provided: VehicleTypeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleTypeFormComponent", function() { return VehicleTypeFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/vehicle-type/vehicle-type.service */ "./src/app/services/vehicle-type/vehicle-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VehicleTypeFormComponent = /** @class */ (function () {
    function VehicleTypeFormComponent(fb, vehicleTypeService, router, route) {
        this.fb = fb;
        this.vehicleTypeService = vehicleTypeService;
        this.router = router;
        this.route = route;
        this.title = "Create Vehicle Type";
        this.module = "vehicle type";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    VehicleTypeFormComponent.prototype.createForm = function () {
        this.vehicleTypeForm = this.fb.group({
            vehicle_type_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    VehicleTypeFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.vehicleTypeForm.valid) {
            if (this.vehicleTypeService.selectedMode == 'Create') {
                this.createVehicleType();
            }
            else if (this.vehicleTypeService.selectedMode == 'Edit') {
                this.updateVehicleType();
            }
        }
    };
    VehicleTypeFormComponent.prototype.getVehicleTypeById = function (vehicleType_id) {
        var _this = this;
        this.vehicleTypeService.getVehicleTypeById(vehicleType_id)
            .subscribe(function (res) {
            _this.vehicleTypeForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    VehicleTypeFormComponent.prototype.createVehicleType = function () {
        var _this = this;
        this.vehicleTypeService.createVehicleType(this.vehicleTypeForm.value)
            .subscribe(function (res) {
            _this.vehicleTypeService.refreshList.next(true);
            _this.vehicleTypeForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    VehicleTypeFormComponent.prototype.updateVehicleType = function () {
        var _this = this;
        this.vehicleTypeService.updateVehicleType(this.vehicleTypeForm.value)
            .subscribe(function (res) {
            _this.vehicleTypeService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    VehicleTypeFormComponent.prototype.deleteVehicleType = function (event) {
        var _this = this;
        if (this.selectedVehicleType_Id) {
            this.vehicleTypeService.deleteVehicleType(this.selectedVehicleType_Id).subscribe(function (res) {
                _this.vehicleTypeService.refreshList.next(true);
                _this.router.navigate(['/vehicleType/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.vehicleTypeForm.reset();
        }
    };
    VehicleTypeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.vehicleTypeService.selectedVehicleTypeId
            .subscribe(function (res) {
            _this.selectedVehicleType_Id = res;
            if (_this.vehicleTypeService.selectedMode == "Edit") {
                _this.title = "Edit Vehicle Type";
                _this.mode = "delete";
                _this.getVehicleTypeById(res);
            }
        }, function (err) {
        });
    };
    VehicleTypeFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vehicleType-form',
            template: __webpack_require__(/*! ./vehicle-type-form.component.html */ "./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.html"),
            styles: [__webpack_require__(/*! ./vehicle-type-form.component.scss */ "./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_3__["VehicleTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VehicleTypeFormComponent);
    return VehicleTypeFormComponent;
}());



/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchVehicleTypes($event)\" (isCreate)=\"createVehicleType('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let vehicleType of results$ | async'>\n          <th scope=\"row\">{{vehicleType.vehicle_type_id}}</th>\n          <td>{{vehicleType.name}}</td>\n          <td class=\"pointer\" (click)=\"selectVehicleType(vehicleType.vehicle_type_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.ts ***!
  \******************************************************************************************/
/*! exports provided: VehicleTypeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleTypeListComponent", function() { return VehicleTypeListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/vehicle-type/vehicle-type.service */ "./src/app/services/vehicle-type/vehicle-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VehicleTypeListComponent = /** @class */ (function () {
    function VehicleTypeListComponent(vehicleTypeService, router, route) {
        this.vehicleTypeService = vehicleTypeService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    VehicleTypeListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/vehicleType/add']);
    };
    VehicleTypeListComponent.prototype.searchVehicleTypes = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    VehicleTypeListComponent.prototype.createVehicleType = function (mode) {
        this.vehicleTypeService.selectedMode = mode;
        this.router.navigate(['/vehicleType/add']);
    };
    //On Click of the Edit Button
    VehicleTypeListComponent.prototype.selectVehicleType = function (vehicleType_id, mode) {
        var _this = this;
        this.vehicleTypeService.selectedMode = mode;
        this.router.navigate(['/vehicleType/edit']);
        setTimeout(function () {
            _this.vehicleTypeService.selectedVehicleTypeId.next(vehicleType_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], VehicleTypeListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], VehicleTypeListComponent.prototype, "searchTerm", void 0);
    VehicleTypeListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vehicleType-list',
            template: __webpack_require__(/*! ./vehicle-type-list.component.html */ "./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.html"),
            styles: [__webpack_require__(/*! ./vehicle-type-list.component.scss */ "./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_3__["VehicleTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VehicleTypeListComponent);
    return VehicleTypeListComponent;
}());



/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type-routing.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type-routing.module.ts ***!
  \************************************************************************/
/*! exports provided: VehicleTypeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleTypeRoutingModule", function() { return VehicleTypeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _vehicle_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vehicle-type.component */ "./src/app/components/vehicle-type/vehicle-type.component.ts");
/* harmony import */ var _vehicle_type_list_vehicle_type_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vehicle-type-list/vehicle-type-list.component */ "./src/app/components/vehicle-type/vehicle-type-list/vehicle-type-list.component.ts");
/* harmony import */ var _vehicle_type_form_vehicle_type_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vehicle-type-form/vehicle-type-form.component */ "./src/app/components/vehicle-type/vehicle-type-form/vehicle-type-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var vehicleTypeRoutes = [
    {
        path: 'vehicleType',
        component: _vehicle_type_component__WEBPACK_IMPORTED_MODULE_2__["VehicleTypeComponent"],
        children: [
            { path: 'list', component: _vehicle_type_list_vehicle_type_list_component__WEBPACK_IMPORTED_MODULE_3__["VehicleTypeListComponent"] },
            { path: 'add', component: _vehicle_type_form_vehicle_type_form_component__WEBPACK_IMPORTED_MODULE_4__["VehicleTypeFormComponent"] },
            { path: 'edit', component: _vehicle_type_form_vehicle_type_form_component__WEBPACK_IMPORTED_MODULE_4__["VehicleTypeFormComponent"] }
        ]
    }
];
var VehicleTypeRoutingModule = /** @class */ (function () {
    function VehicleTypeRoutingModule() {
    }
    VehicleTypeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(vehicleTypeRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], VehicleTypeRoutingModule);
    return VehicleTypeRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-vehicleType-list (searchTerm)=\"searchVehicleTypes($event)\" [results$]=\"vehicleTypes$\"></app-vehicleType-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/vehicle-type/vehicle-type.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/vehicle-type/vehicle-type.component.ts ***!
  \*******************************************************************/
/*! exports provided: VehicleTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleTypeComponent", function() { return VehicleTypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/vehicle-type/vehicle-type.service */ "./src/app/services/vehicle-type/vehicle-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VehicleTypeComponent = /** @class */ (function () {
    function VehicleTypeComponent(fb, vehicleTypeService, router, route) {
        this.fb = fb;
        this.vehicleTypeService = vehicleTypeService;
        this.router = router;
        this.route = route;
        this.title = "Vehicle Type";
    }
    VehicleTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getVehicleTypes();
        this.vehicleTypeService.refreshList.subscribe(function (res) {
            _this.getVehicleTypes();
        }, function (err) {
            console.log(err);
        });
    };
    VehicleTypeComponent.prototype.getVehicleTypes = function () {
        this.vehicleTypes$ = this.vehicleTypeService.getVehicleTypes();
    };
    VehicleTypeComponent.prototype.searchVehicleTypes = function (searchTerm) {
        if (searchTerm) {
            this.vehicleTypes$ = this.vehicleTypeService.searchVehicleTypes(searchTerm);
        }
        else {
            this.vehicleTypes$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    VehicleTypeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-make',
            template: __webpack_require__(/*! ./vehicle-type.component.html */ "./src/app/components/vehicle-type/vehicle-type.component.html"),
            styles: [__webpack_require__(/*! ./vehicle-type.component.scss */ "./src/app/components/vehicle-type/vehicle-type.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_vehicle_type_vehicle_type_service__WEBPACK_IMPORTED_MODULE_4__["VehicleTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], VehicleTypeComponent);
    return VehicleTypeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-vehicle-type-vehicle-type-routing-module.js.map