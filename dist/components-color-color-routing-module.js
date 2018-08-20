(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-color-color-routing-module"],{

/***/ "./src/app/components/color/color-form/color-form.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/color/color-form/color-form.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"colorForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputColorName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputColorName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"colorForm.controls.name.touched && colorForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"colorForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"colorForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"colorForm.controls.name.value\" (isDelete)=\"deleteColor($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/color/color-form/color-form.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/color/color-form/color-form.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/color/color-form/color-form.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/color/color-form/color-form.component.ts ***!
  \*********************************************************************/
/*! exports provided: ColorFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorFormComponent", function() { return ColorFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_color_color_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/color/color.service */ "./src/app/services/color/color.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ColorFormComponent = /** @class */ (function () {
    function ColorFormComponent(fb, colorService, router, route) {
        this.fb = fb;
        this.colorService = colorService;
        this.router = router;
        this.route = route;
        this.title = "Create Color";
        this.module = "color";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    ColorFormComponent.prototype.createForm = function () {
        this.colorForm = this.fb.group({
            color_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    ColorFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.colorForm.valid) {
            if (this.colorService.selectedMode == 'Create') {
                this.createColor();
            }
            else if (this.colorService.selectedMode == 'Edit') {
                this.updateColor();
            }
        }
    };
    ColorFormComponent.prototype.getColorById = function (color_id) {
        var _this = this;
        this.colorService.getColorById(color_id)
            .subscribe(function (res) {
            _this.colorForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    ColorFormComponent.prototype.createColor = function () {
        var _this = this;
        this.colorService.createColor(this.colorForm.value)
            .subscribe(function (res) {
            _this.colorService.refreshList.next(true);
            _this.colorForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    ColorFormComponent.prototype.updateColor = function () {
        var _this = this;
        this.colorService.updateColor(this.colorForm.value)
            .subscribe(function (res) {
            _this.colorService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    ColorFormComponent.prototype.deleteColor = function (event) {
        var _this = this;
        if (this.selectedColor_Id) {
            this.colorService.deleteColor(this.selectedColor_Id).subscribe(function (res) {
                _this.colorService.refreshList.next(true);
                _this.router.navigate(['/color/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.colorForm.reset();
        }
    };
    ColorFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.colorService.selectedColorId
            .subscribe(function (res) {
            _this.selectedColor_Id = res;
            if (_this.colorService.selectedMode == "Edit") {
                _this.title = "Edit Color";
                _this.mode = "delete";
                _this.getColorById(res);
            }
        }, function (err) {
        });
    };
    ColorFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-color-form',
            template: __webpack_require__(/*! ./color-form.component.html */ "./src/app/components/color/color-form/color-form.component.html"),
            styles: [__webpack_require__(/*! ./color-form.component.scss */ "./src/app/components/color/color-form/color-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_color_color_service__WEBPACK_IMPORTED_MODULE_3__["ColorService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ColorFormComponent);
    return ColorFormComponent;
}());



/***/ }),

/***/ "./src/app/components/color/color-list/color-list.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/color/color-list/color-list.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchColors($event)\" (isCreate)=\"createColor('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let color of results$ | async'>\n          <th scope=\"row\">{{color.color_id}}</th>\n          <td>{{color.name}}</td>\n          <td class=\"pointer\" (click)=\"selectColor(color.color_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/color/color-list/color-list.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/color/color-list/color-list.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/color/color-list/color-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/color/color-list/color-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: ColorListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorListComponent", function() { return ColorListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_color_color_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/color/color.service */ "./src/app/services/color/color.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ColorListComponent = /** @class */ (function () {
    function ColorListComponent(colorService, router, route) {
        this.colorService = colorService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ColorListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/color/add']);
    };
    ColorListComponent.prototype.searchColors = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    ColorListComponent.prototype.createColor = function (mode) {
        this.colorService.selectedMode = mode;
        this.router.navigate(['/color/add']);
    };
    //On Click of the Edit Button
    ColorListComponent.prototype.selectColor = function (color_id, mode) {
        var _this = this;
        this.colorService.selectedMode = mode;
        this.router.navigate(['/color/edit']);
        setTimeout(function () {
            _this.colorService.selectedColorId.next(color_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], ColorListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ColorListComponent.prototype, "searchTerm", void 0);
    ColorListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-color-list',
            template: __webpack_require__(/*! ./color-list.component.html */ "./src/app/components/color/color-list/color-list.component.html"),
            styles: [__webpack_require__(/*! ./color-list.component.scss */ "./src/app/components/color/color-list/color-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_color_color_service__WEBPACK_IMPORTED_MODULE_3__["ColorService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ColorListComponent);
    return ColorListComponent;
}());



/***/ }),

/***/ "./src/app/components/color/color-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/color/color-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: ColorRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorRoutingModule", function() { return ColorRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _color_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color.component */ "./src/app/components/color/color.component.ts");
/* harmony import */ var _color_list_color_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color-list/color-list.component */ "./src/app/components/color/color-list/color-list.component.ts");
/* harmony import */ var _color_form_color_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color-form/color-form.component */ "./src/app/components/color/color-form/color-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var colorRoutes = [
    {
        path: 'color',
        component: _color_component__WEBPACK_IMPORTED_MODULE_2__["ColorComponent"],
        children: [
            { path: 'list', component: _color_list_color_list_component__WEBPACK_IMPORTED_MODULE_3__["ColorListComponent"] },
            { path: 'add', component: _color_form_color_form_component__WEBPACK_IMPORTED_MODULE_4__["ColorFormComponent"] },
            { path: 'edit', component: _color_form_color_form_component__WEBPACK_IMPORTED_MODULE_4__["ColorFormComponent"] }
        ]
    }
];
var ColorRoutingModule = /** @class */ (function () {
    function ColorRoutingModule() {
    }
    ColorRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(colorRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ColorRoutingModule);
    return ColorRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/color/color.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/color/color.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-color-list (searchTerm)=\"searchColors($event)\" [results$]=\"colors$\"></app-color-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/color/color.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/components/color/color.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/color/color.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/color/color.component.ts ***!
  \*****************************************************/
/*! exports provided: ColorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorComponent", function() { return ColorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_color_color_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/color/color.service */ "./src/app/services/color/color.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ColorComponent = /** @class */ (function () {
    function ColorComponent(fb, colorService, router, route) {
        this.fb = fb;
        this.colorService = colorService;
        this.router = router;
        this.route = route;
        this.title = "Color";
    }
    ColorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getColors();
        this.colorService.refreshList.subscribe(function (res) {
            _this.getColors();
        }, function (err) {
            console.log(err);
        });
    };
    ColorComponent.prototype.getColors = function () {
        this.colors$ = this.colorService.getColors();
    };
    ColorComponent.prototype.searchColors = function (searchTerm) {
        if (searchTerm) {
            this.colors$ = this.colorService.searchColors(searchTerm);
        }
        else {
            this.colors$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    ColorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-color',
            template: __webpack_require__(/*! ./color.component.html */ "./src/app/components/color/color.component.html"),
            styles: [__webpack_require__(/*! ./color.component.scss */ "./src/app/components/color/color.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_color_color_service__WEBPACK_IMPORTED_MODULE_4__["ColorService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ColorComponent);
    return ColorComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-color-color-routing-module.js.map