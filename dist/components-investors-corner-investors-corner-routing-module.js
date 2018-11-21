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

module.exports = "\n\n<section>\n    <form>\n  <table class=\"table\">\n    <thead class=\"#f5f5f5 grey lighten-4\">\n      <tr>\n        <th class=\"text-center\">Car Details</th>\n        <th class=\"text-center\">Investment</th>\n        <th class=\"text-center\">Expenses</th>\n        <th class=\"text-center\">Profit and Loss</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let car of cars$;let i=index\">\n        <td><span>{{car.make_name}}</span><br>\n          <span>{{car.model_name}}</span>\n        </td>\n        <td>\n          <table class=\"table\">\n            <thead class=\"#f5f5f5 grey lighten-4\">\n              <tr>\n                <th>Date</th>\n                <th>Investor</th>\n                <th>Type</th>\n                <th class=\"text-right\">Amount</th>\n              </tr>\n            </thead>\n            <tbody *ngFor=\"let td of transactionDetails\">\n              <tr  *ngIf=\"td.transaction_type_id == 1 && car.car_id == td.car_id\"  >\n              <td>{{td.date | date}}</td>\n              <td>{{td.investor_name}}</td>\n              <td>{{td.transaction_type_name}}</td>\n              <td class=\"text-right\">{{td.debit}}</td>\n            </tr>\n          </tbody>\n          </table>\n        </td>\n        <td>\n          <table class=\"table\">\n            <thead class=\"#f5f5f5 grey lighten-4\">\n              <tr>\n                <th>Date</th>\n                <th>Investor</th>\n                <th>Type</th>\n                <th class=\"text-right\">Amount</th>\n              </tr>\n            </thead>\n            <tbody *ngFor=\"let td of transactionDetails\">\n              <tr  *ngIf=\"td.transaction_type_id == 2 && car.car_id == td.car_id\"  >\n              <td>{{td.date | date}}</td>\n              <td>{{td.investor_name}}</td>\n              <td>{{td.expense_name}}</td>\n              <td class=\"text-right\">{{td.debit}}</td>\n            </tr>\n          </tbody>\n          </table>\n        </td>\n        <td>\n          <table class=\"table\">\n            <thead class=\"#f5f5f5 grey lighten-4\">\n              <tr>\n                <th>Date</th>\n                <th>Investor</th>\n                <th>Profit</th>\n                <th>Loss</th>\n\n              </tr>\n            </thead>\n            <tbody *ngFor=\"let td of transactionDetails\">\n              <tr  *ngIf=\"(td.transaction_type_id == 3 || td.transaction_type_id == 4) && car.car_id == td.car_id\"  >\n              <td>{{td.date | date}}</td>\n              <td>{{td.investor_name}}</td>\n              <td class=\"text-right\">{{td.credit}}</td>\n              <td class=\"text-right\">{{td.debit}}</td>\n            </tr>\n          </tbody>\n          </table>\n        </td>\n      </tr>\n\n    </tbody>\n  </table>\n</form>\n</section>\n"

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
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var app_services_client_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/client/client.service */ "./src/app/services/client/client.service.ts");
/* harmony import */ var app_services_car_car_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/car/car.service */ "./src/app/services/car/car.service.ts");
/* harmony import */ var app_services_transaction_details_transaction_details_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/transaction-details/transaction-details.service */ "./src/app/services/transaction-details/transaction-details.service.ts");
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
    function InvestorsCornerComponent(fb, carService, transactionDetailsService, clientService) {
        this.fb = fb;
        this.carService = carService;
        this.transactionDetailsService = transactionDetailsService;
        this.clientService = clientService;
        this.investors = [];
        this.expenses = [];
        this.transactionDetails = [];
        this.investorsDetails = new Array();
    }
    InvestorsCornerComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.getTransactionDetailsById();
        this.getCars();
    };
    InvestorsCornerComponent.prototype.createForm = function () {
        this.transactionDetailsForm = this.fb.group({
            car_records: this.fb.array([
                this.fb.group({
                    car_id: [],
                    investor_records: this.fb.array([
                        this.fb.group({
                            investor_id: [],
                        }),
                    ]),
                }),
            ]),
        });
    };
    InvestorsCornerComponent.prototype.getCars = function () {
        var _this = this;
        this.carService.getCars().subscribe(function (res) {
            _this.cars$ = res;
            // this.cars$.forEach(car=>{
            //
            //   // this.clientService.getInvestorsExpensesAndPercent(car.car_id)
            //   // .subscribe(res => {
            //   //   this.investorsExpensesAndPercent$ = res;
            //   //   this.investorsExpensesAndPercent$.forEach(rec=>{
            //   //     this.investorsDetails.push(rec);
            //   //   })
            //
            // });
            //
            // console.log("moly ",this.investorsExpensesAndPercent);
            //});
            // let control = <FormArray>this.transactionDetailsForm.get('car_records');
            // this.cars$.forEach(car=>{
            //   this.investors = this.transactionDetails.filter(s => s.transaction_type_id == 1 && s.car_id == car.car_id);
            //   this.expenses = this.transactionDetails.filter(s => s.transaction_type_id == 2 && s.car_id == car.car_id);
            //
            //   control.push(this.fb.group({car_id:car.car_id, investor_records:this.investors, expense_records:this.expenses}));
            //   console.log("aa ",this.transactionDetailsForm.value);
            // })
        }, function (err) {
        });
    };
    InvestorsCornerComponent.prototype.getTransactionDetailsById = function () {
        var _this = this;
        this.transactionDetailsService.getTransactionDetails().subscribe(function (res) {
            _this.transactionDetails = res;
            //  this.getCars();
        }, function (err) {
        });
    };
    InvestorsCornerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-investors-corner',
            template: __webpack_require__(/*! ./investors-corner.component.html */ "./src/app/components/investors-corner/investors-corner.component.html"),
            styles: [__webpack_require__(/*! ./investors-corner.component.scss */ "./src/app/components/investors-corner/investors-corner.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            app_services_car_car_service__WEBPACK_IMPORTED_MODULE_3__["CarService"],
            app_services_transaction_details_transaction_details_service__WEBPACK_IMPORTED_MODULE_4__["TransactionDetailsService"],
            app_services_client_client_service__WEBPACK_IMPORTED_MODULE_2__["ClientService"]])
    ], InvestorsCornerComponent);
    return InvestorsCornerComponent;
}());



/***/ })

}]);
//# sourceMappingURL=components-investors-corner-investors-corner-routing-module.js.map