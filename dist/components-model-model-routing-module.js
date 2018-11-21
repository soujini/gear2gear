(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-model-model-routing-module"],{

/***/ "./src/app/components/model/model-form/model-form.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/model/model-form/model-form.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  <div class=\"col-12 grey lighten-4\">\n    <header class=\"header row\">\n      <div class=\"col-12\">\n        <app-title [title]=title></app-title>\n      </div>\n    </header>\n\n    <div class=\"col-12\">\n      <form [formGroup]=\"modelForm\" (ngSubmit)=\"onSubmit()\" >\n        <div class=\"form-group\">\n          <label for=\"inputModelName\" class=\"col-sm-2 col-form-label\">Name</label>\n          <div>\n            <div class=\"md-form mt-0\">\n              <input type=\"text\" class=\"form-control capitalize\" id=\"inputModelName\" formControlName=\"name\">\n              <!-- <p style=\"color:red\" *ngIf=\"modelForm.controls.name.touched && modelForm.controls.name.errors.required\">Required</p> -->\n              <app-control-messages [control]=\"modelForm.controls.name\"></app-control-messages>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"text-right\">\n            <!--  [disabled]=\"modelForm.invalid\"-->\n            <button type=\"submit\" class=\"btn btn-primary btn-custom btn-md\" >\n              <i class=\"fa fa-save\"></i>\n            </button>\n            <app-simple-modal [module]=\"module\" [mode]=\"mode\" [name]=\"modelForm.controls.name.value\" (isDelete)=\"deleteModel($event)\"></app-simple-modal>\n\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/model/model-form/model-form.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/model/model-form/model-form.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/model/model-form/model-form.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/model/model-form/model-form.component.ts ***!
  \*********************************************************************/
/*! exports provided: ModelFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelFormComponent", function() { return ModelFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_model_model_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/model/model.service */ "./src/app/services/model/model.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModelFormComponent = /** @class */ (function () {
    function ModelFormComponent(fb, modelService, router, route) {
        this.fb = fb;
        this.modelService = modelService;
        this.router = router;
        this.route = route;
        this.title = "Create Model";
        this.module = "model";
        this.mode = "discard";
        this.message = "";
        this.submitted = false;
    }
    ModelFormComponent.prototype.createForm = function () {
        this.modelForm = this.fb.group({
            model_id: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
        });
    };
    ModelFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.modelForm.valid) {
            if (this.modelService.selectedMode == 'Create') {
                this.createModel();
            }
            else if (this.modelService.selectedMode == 'Edit') {
                this.updateModel();
            }
        }
    };
    ModelFormComponent.prototype.getModelById = function (model_id) {
        var _this = this;
        this.modelService.getModelById(model_id)
            .subscribe(function (res) {
            _this.modelForm.patchValue(res[0]);
        }, function (err) {
            console.log(err);
        });
    };
    ModelFormComponent.prototype.createModel = function () {
        var _this = this;
        this.modelService.createModel(this.modelForm.value)
            .subscribe(function (res) {
            _this.modelService.refreshList.next(true);
            _this.modelForm.reset();
        }, function (err) {
            console.log(err);
        });
    };
    ModelFormComponent.prototype.updateModel = function () {
        var _this = this;
        this.modelService.updateModel(this.modelForm.value)
            .subscribe(function (res) {
            _this.modelService.refreshList.next(true);
        }, function (err) {
            console.log(err);
        });
    };
    ModelFormComponent.prototype.deleteModel = function (event) {
        var _this = this;
        if (this.selectedModel_Id) {
            this.modelService.deleteModel(this.selectedModel_Id).subscribe(function (res) {
                _this.modelService.refreshList.next(true);
                _this.router.navigate(['/model/add']);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.modelForm.reset();
        }
    };
    ModelFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.modelService.selectedModelId
            .subscribe(function (res) {
            _this.selectedModel_Id = res;
            if (_this.modelService.selectedMode == "Edit") {
                _this.title = "Edit Model";
                _this.mode = "delete";
                _this.getModelById(res);
            }
        }, function (err) {
        });
    };
    ModelFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-model-form',
            template: __webpack_require__(/*! ./model-form.component.html */ "./src/app/components/model/model-form/model-form.component.html"),
            styles: [__webpack_require__(/*! ./model-form.component.scss */ "./src/app/components/model/model-form/model-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_model_model_service__WEBPACK_IMPORTED_MODULE_3__["ModelService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ModelFormComponent);
    return ModelFormComponent;
}());



/***/ }),

/***/ "./src/app/components/model/model-list/model-list.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/model/model-list/model-list.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section-list\">\n  <div>\n    <app-search (searchTermValueChanged)=\"searchModels($event)\" (isCreate)=\"createModel('Create')\"></app-search>\n  </div>\n  <div>\n    <table class=\"table\">\n      <thead class=\"#f5f5f5 grey lighten-4\">\n        <tr>\n          <th>#</th>\n          <th>Name</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor='let model of results$ | async' [ngClass]=\"{'is-active': selectedModelId == model.model_id}\">\n          <th scope=\"row\">{{model.model_id}}</th>\n          <td>{{model.name}}</td>\n          <td class=\"pointer\" (click)=\"selectModel(model.model_id, 'Edit')\">\n              <i class=\"fa fa-pencil\"></i>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/model/model-list/model-list.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/model/model-list/model-list.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/model/model-list/model-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/model/model-list/model-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: ModelListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelListComponent", function() { return ModelListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_model_model_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/model/model.service */ "./src/app/services/model/model.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModelListComponent = /** @class */ (function () {
    function ModelListComponent(modelService, router, route) {
        this.modelService = modelService;
        this.router = router;
        this.route = route;
        this.searchTerm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ModelListComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/model/add']);
    };
    ModelListComponent.prototype.searchModels = function (search) {
        this.searchTerm.emit(search);
    };
    //On Click of the Add Button
    ModelListComponent.prototype.createModel = function (mode) {
        this.modelService.selectedMode = mode;
        this.router.navigate(['/model/add']);
    };
    //On Click of the Edit Button
    ModelListComponent.prototype.selectModel = function (model_id, mode) {
        var _this = this;
        this.selectedModelId = model_id;
        this.modelService.selectedMode = mode;
        this.router.navigate(['/model/edit']);
        setTimeout(function () {
            _this.modelService.selectedModelId.next(model_id);
        }, 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], ModelListComponent.prototype, "results$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ModelListComponent.prototype, "searchTerm", void 0);
    ModelListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-model-list',
            template: __webpack_require__(/*! ./model-list.component.html */ "./src/app/components/model/model-list/model-list.component.html"),
            styles: [__webpack_require__(/*! ./model-list.component.scss */ "./src/app/components/model/model-list/model-list.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_model_model_service__WEBPACK_IMPORTED_MODULE_3__["ModelService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ModelListComponent);
    return ModelListComponent;
}());



/***/ }),

/***/ "./src/app/components/model/model-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/model/model-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: ModelRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelRoutingModule", function() { return ModelRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model.component */ "./src/app/components/model/model.component.ts");
/* harmony import */ var _model_list_model_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model-list/model-list.component */ "./src/app/components/model/model-list/model-list.component.ts");
/* harmony import */ var _model_form_model_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model-form/model-form.component */ "./src/app/components/model/model-form/model-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var modelRoutes = [
    {
        path: 'model',
        component: _model_component__WEBPACK_IMPORTED_MODULE_2__["ModelComponent"],
        children: [
            { path: 'list', component: _model_list_model_list_component__WEBPACK_IMPORTED_MODULE_3__["ModelListComponent"] },
            { path: 'add', component: _model_form_model_form_component__WEBPACK_IMPORTED_MODULE_4__["ModelFormComponent"] },
            { path: 'edit', component: _model_form_model_form_component__WEBPACK_IMPORTED_MODULE_4__["ModelFormComponent"] }
        ]
    }
];
var ModelRoutingModule = /** @class */ (function () {
    function ModelRoutingModule() {
    }
    ModelRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(modelRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ModelRoutingModule);
    return ModelRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/model/model.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/model/model.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"col-12\">\n    <app-title [title]=title></app-title>\n  </div>\n</header>\n\n<div class=\"row\">\n  <div class=\"col-4\">\n  <app-model-list (searchTerm)=\"searchModels($event)\" [results$]=\"models$\"></app-model-list>\n  </div>\n  <div class=\"col-8\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/model/model.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/components/model/model.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/model/model.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/model/model.component.ts ***!
  \*****************************************************/
/*! exports provided: ModelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelComponent", function() { return ModelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/EmptyObservable */ "./node_modules/rxjs-compat/_esm5/observable/EmptyObservable.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_model_model_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/model/model.service */ "./src/app/services/model/model.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ModelComponent = /** @class */ (function () {
    function ModelComponent(fb, modelService, router, route) {
        this.fb = fb;
        this.modelService = modelService;
        this.router = router;
        this.route = route;
        this.title = "Model";
    }
    ModelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getModels();
        this.modelService.refreshList.subscribe(function (res) {
            _this.getModels();
        }, function (err) {
            console.log(err);
        });
    };
    ModelComponent.prototype.getModels = function () {
        this.models$ = this.modelService.getModels();
    };
    ModelComponent.prototype.searchModels = function (searchTerm) {
        if (searchTerm) {
            this.models$ = this.modelService.searchModels(searchTerm);
        }
        else {
            this.models$ = new rxjs_observable_EmptyObservable__WEBPACK_IMPORTED_MODULE_2__["EmptyObservable"]();
        }
    };
    ModelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-model',
            template: __webpack_require__(/*! ./model.component.html */ "./src/app/components/model/model.component.html"),
            styles: [__webpack_require__(/*! ./model.component.scss */ "./src/app/components/model/model.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], app_services_model_model_service__WEBPACK_IMPORTED_MODULE_4__["ModelService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ModelComponent);
    return ModelComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-model-model-routing-module.js.map