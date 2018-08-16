(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-investors-corner-investors-corner-routing-module"],{

/***/ "./src/app/components/investors-corner/investors-corner-routing.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/investors-corner/investors-corner-routing.module.ts ***!
  \********************************************************************************/
/*! exports provided: InvestorsCornerRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestorsCornerRoutingModule", function() { return InvestorsCornerRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _investors_corner_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./investors-corner.component */ "./src/app/components/investors-corner/investors-corner.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var investorsCornerRoutes = [
    {
        path: 'investors-corner',
        component: _investors_corner_component__WEBPACK_IMPORTED_MODULE_2__["InvestorsCornerComponent"],
    }
];
var InvestorsCornerRoutingModule = /** @class */ (function () {
    function InvestorsCornerRoutingModule() {
    }
    InvestorsCornerRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(investorsCornerRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], InvestorsCornerRoutingModule);
    return InvestorsCornerRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/investors-corner/investors-corner.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/components/investors-corner/investors-corner.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid section\">\n  investors-corner works!\n</section>\n"

/***/ }),

/***/ "./src/app/components/investors-corner/investors-corner.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/components/investors-corner/investors-corner.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/investors-corner/investors-corner.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/investors-corner/investors-corner.component.ts ***!
  \***************************************************************************/
/*! exports provided: InvestorsCornerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestorsCornerComponent", function() { return InvestorsCornerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InvestorsCornerComponent = /** @class */ (function () {
    function InvestorsCornerComponent() {
    }
    InvestorsCornerComponent.prototype.ngOnInit = function () {
    };
    InvestorsCornerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-investors-corner',
            template: __webpack_require__(/*! ./investors-corner.component.html */ "./src/app/components/investors-corner/investors-corner.component.html"),
            styles: [__webpack_require__(/*! ./investors-corner.component.scss */ "./src/app/components/investors-corner/investors-corner.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], InvestorsCornerComponent);
    return InvestorsCornerComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-investors-corner-investors-corner-routing-module.js.map