(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/services/client/client.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/client/client.service.ts ***!
  \***************************************************/
/*! exports provided: ClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientService", function() { return ClientService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var ClientService = /** @class */ (function () {
    function ClientService(http) {
        this.http = http;
        this.clientsUrl = '/api/clients';
        this.putUrl = '/api/clients';
        this.selectedClientId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    ClientService.prototype.getClients = function () {
        return this.http.get('http://localhost:3000/api/clients', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.getInvestors = function () {
        return this.http.get('http://localhost:3000/api/investors', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.getInvestorsExpensesAndPercent = function (car_id) {
        return this.http.get('http://localhost:3000/api/investors/investorsExpensesAndPercent/' + car_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.getAvailableBalance = function (investor_id) {
        return this.http.get('http://localhost:3000/api/investors/' + investor_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.updateAvailableBalance = function (investor) {
        var body = JSON.stringify(investor);
        var investor_id = investor.investor_id;
        return this.http.patch('http://localhost:3000/api/clients/' + investor_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .subscribe(function (res) {
            console.log("Available Balance for the client is updated", res);
        }, function (err) {
            console.log("Error ", err);
        }, function () {
            console.log("Completed");
        });
    };
    ClientService.prototype.updateTotalExpenses = function (investor) {
        var body = JSON.stringify(investor);
        var investor_id = investor.investor_id;
        return this.http.patch('http://localhost:3000/api/clients/expenses/' + investor_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .subscribe(function (res) {
            console.log("Total Expenses for the client is updated : ", res);
        }, function (err) {
            console.log("Error ", err);
        }, function () {
            console.log("Completed");
        });
    };
    ClientService.prototype.getClientById = function (client_id) {
        return this.http.get('http://localhost:3000/api/clients/' + client_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.searchClients = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/clients/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.createClient = function (newClient) {
        var body = JSON.stringify(newClient);
        return this.http.post('http://localhost:3000/api/clients', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.updateClient = function (editClient) {
        var body = JSON.stringify(editClient);
        var client_id = editClient.client_id;
        return this.http.put('http://localhost:3000/api/clients/' + client_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.deleteClient = function (client_id) {
        return this.http.delete('http://localhost:3000/api/clients/' + client_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ClientService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ClientService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    ClientService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    ClientService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ClientService);
    return ClientService;
}());



/***/ }),

/***/ "./src/app/services/color/color.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/color/color.service.ts ***!
  \*************************************************/
/*! exports provided: ColorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorService", function() { return ColorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var ColorService = /** @class */ (function () {
    function ColorService(http) {
        this.http = http;
        this.colorsUrl = '/api/colors';
        this.putUrl = '/api/colors';
        this.selectedColorId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    ColorService.prototype.getColors = function () {
        return this.http.get('http://localhost:3000/api/colors', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ColorService.prototype.getColorById = function (color_id) {
        return this.http.get('http://localhost:3000/api/colors/' + color_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ColorService.prototype.searchColors = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/colors/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ColorService.prototype.createColor = function (newColor) {
        var body = JSON.stringify(newColor);
        return this.http.post('http://localhost:3000/api/colors', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ColorService.prototype.updateColor = function (editColor) {
        var body = JSON.stringify(editColor);
        var color_id = editColor.color_id;
        return this.http.put("http://localhost:3000/api/colors/" + color_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ColorService.prototype.deleteColor = function (color_id) {
        return this.http.delete('http://localhost:3000/api/colors/' + color_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ColorService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ColorService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    ColorService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    ColorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ColorService);
    return ColorService;
}());



/***/ }),

/***/ "./src/app/services/expense/expense.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/expense/expense.service.ts ***!
  \*****************************************************/
/*! exports provided: ExpenseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpenseService", function() { return ExpenseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var ExpenseService = /** @class */ (function () {
    function ExpenseService(http) {
        this.http = http;
        this.expensesUrl = '/api/expenses';
        this.putUrl = '/api/expenses';
        this.selectedExpenseId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    ExpenseService.prototype.getExpenses = function () {
        return this.http.get('http://localhost:3000/api/expenses', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ExpenseService.prototype.getExpenseById = function (expense_id) {
        return this.http.get('http://localhost:3000/api/expenses/' + expense_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ExpenseService.prototype.searchExpenses = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/expenses/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ExpenseService.prototype.createExpense = function (newExpense) {
        var body = JSON.stringify(newExpense);
        return this.http.post('http://localhost:3000/api/expenses', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ExpenseService.prototype.updateExpense = function (editExpense) {
        var body = JSON.stringify(editExpense);
        var expense_id = editExpense.expense_id;
        return this.http.put("http://localhost:3000/api/expenses/" + expense_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ExpenseService.prototype.deleteExpense = function (expense_id) {
        return this.http.delete('http://localhost:3000/api/expenses/' + expense_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ExpenseService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ExpenseService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    ExpenseService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    ExpenseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ExpenseService);
    return ExpenseService;
}());



/***/ }),

/***/ "./src/app/services/fuel-type/fuel-type.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/fuel-type/fuel-type.service.ts ***!
  \*********************************************************/
/*! exports provided: FuelTypeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuelTypeService", function() { return FuelTypeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var FuelTypeService = /** @class */ (function () {
    function FuelTypeService(http) {
        this.http = http;
        this.fuelTypesUrl = '/api/fuelTypes';
        this.putUrl = '/api/fuelTypes';
        this.selectedFuelTypeId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    FuelTypeService.prototype.getFuelTypes = function () {
        return this.http.get('http://localhost:3000/api/fuelTypes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    FuelTypeService.prototype.getFuelTypeById = function (fuel_type_id) {
        return this.http.get('http://localhost:3000/api/fuelTypes/' + fuel_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    FuelTypeService.prototype.searchFuelTypes = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/fuelTypes/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    FuelTypeService.prototype.createFuelType = function (newFuelType) {
        var body = JSON.stringify(newFuelType);
        return this.http.post('http://localhost:3000/api/fuelTypes', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    FuelTypeService.prototype.updateFuelType = function (editFuelType) {
        var body = JSON.stringify(editFuelType);
        var fuel_type_id = editFuelType.fuel_type_id;
        return this.http.put("http://localhost:3000/api/fuelTypes/" + fuel_type_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    FuelTypeService.prototype.deleteFuelType = function (fuel_type_id) {
        return this.http.delete('http://localhost:3000/api/fuelTypes/' + fuel_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    FuelTypeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    FuelTypeService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    FuelTypeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    FuelTypeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], FuelTypeService);
    return FuelTypeService;
}());



/***/ }),

/***/ "./src/app/services/insurance-type/insurance-type.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/services/insurance-type/insurance-type.service.ts ***!
  \*******************************************************************/
/*! exports provided: InsuranceTypeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceTypeService", function() { return InsuranceTypeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var InsuranceTypeService = /** @class */ (function () {
    function InsuranceTypeService(http) {
        this.http = http;
        this.insuranceTypesUrl = '/api/insuranceTypes';
        this.putUrl = '/api/insuranceTypes';
        this.selectedInsuranceTypeId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    InsuranceTypeService.prototype.getInsuranceTypes = function () {
        return this.http.get('http://localhost:3000/api/insuranceTypes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceTypeService.prototype.getInsuranceTypeById = function (insurance_type_id) {
        return this.http.get('http://localhost:3000/api/insuranceTypes/' + insurance_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceTypeService.prototype.searchInsuranceTypes = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/insuranceTypes/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceTypeService.prototype.createInsuranceType = function (newInsuranceType) {
        var body = JSON.stringify(newInsuranceType);
        return this.http.post('http://localhost:3000/api/insuranceTypes', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceTypeService.prototype.updateInsuranceType = function (editInsuranceType) {
        var body = JSON.stringify(editInsuranceType);
        var insurance_type_id = editInsuranceType.insurance_type_id;
        return this.http.put("http://localhost:3000/api/insuranceTypes/" + insurance_type_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceTypeService.prototype.deleteInsuranceType = function (insurance_type_id) {
        return this.http.delete('http://localhost:3000/api/insuranceTypes/' + insurance_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceTypeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    InsuranceTypeService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    InsuranceTypeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    InsuranceTypeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], InsuranceTypeService);
    return InsuranceTypeService;
}());



/***/ }),

/***/ "./src/app/services/insurance/insurance.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/insurance/insurance.service.ts ***!
  \*********************************************************/
/*! exports provided: InsuranceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceService", function() { return InsuranceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var InsuranceService = /** @class */ (function () {
    function InsuranceService(http) {
        this.http = http;
        this.insurancesUrl = '/api/insurances';
        this.putUrl = '/api/insurances';
        this.selectedInsuranceId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    InsuranceService.prototype.getInsurances = function () {
        return this.http.get('http://localhost:3000/api/insurances', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceService.prototype.getInsuranceById = function (insurance_id) {
        return this.http.get('http://localhost:3000/api/insurances/' + insurance_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceService.prototype.searchInsurances = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/insurances/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceService.prototype.createInsurance = function (newInsurance) {
        var body = JSON.stringify(newInsurance);
        return this.http.post('http://localhost:3000/api/insurances', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceService.prototype.updateInsurance = function (editInsurance) {
        var body = JSON.stringify(editInsurance);
        var insurance_id = editInsurance.insurance_id;
        return this.http.put("http://localhost:3000/api/insurances/" + insurance_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceService.prototype.deleteInsurance = function (insurance_id) {
        return this.http.delete('http://localhost:3000/api/insurances/' + insurance_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    InsuranceService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    InsuranceService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    InsuranceService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    InsuranceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], InsuranceService);
    return InsuranceService;
}());



/***/ }),

/***/ "./src/app/services/make/make.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/make/make.service.ts ***!
  \***********************************************/
/*! exports provided: MakeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MakeService", function() { return MakeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var MakeService = /** @class */ (function () {
    function MakeService(http) {
        this.http = http;
        this.makesUrl = '/api/makes';
        this.putUrl = '/api/makes';
        this.selectedMakeId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    MakeService.prototype.getMakes = function () {
        return this.http.get('https://gear2gear.herokuapp.com/api/makes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
        //.map(res => res);
    };
    MakeService.prototype.getMakeById = function (make_id) {
        return this.http.get('https://gear2gear.herokuapp.com/api/makes/' + make_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    MakeService.prototype.searchMakes = function (searchTerm) {
        return this.http.get('https://gear2gear.herokuapp.com/api/makes/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    MakeService.prototype.createMake = function (newMake) {
        var body = JSON.stringify(newMake);
        return this.http.post('https://gear2gear.herokuapp.com/api/makes', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    MakeService.prototype.updateMake = function (editMake) {
        var body = JSON.stringify(editMake);
        var make_id = editMake.make_id;
        return this.http.put("https://gear2gear.herokuapp.com/api/makes/" + make_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    MakeService.prototype.deleteMake = function (make_id) {
        return this.http.delete('https://gear2gear.herokuapp.com/api/makes/' + make_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    MakeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    MakeService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    MakeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    MakeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], MakeService);
    return MakeService;
}());



/***/ }),

/***/ "./src/app/services/model/model.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/model/model.service.ts ***!
  \*************************************************/
/*! exports provided: ModelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelService", function() { return ModelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var ModelService = /** @class */ (function () {
    function ModelService(http) {
        this.http = http;
        this.modelsUrl = '/api/models';
        this.putUrl = '/api/models';
        this.selectedModelId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    ModelService.prototype.getModels = function () {
        return this.http.get('http://localhost:3000/api/models', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ModelService.prototype.getModelById = function (model_id) {
        return this.http.get('http://localhost:3000/api/models/' + model_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ModelService.prototype.searchModels = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/models/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ModelService.prototype.createModel = function (newModel) {
        var body = JSON.stringify(newModel);
        return this.http.post('http://localhost:3000/api/models', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ModelService.prototype.updateModel = function (editModel) {
        var body = JSON.stringify(editModel);
        var model_id = editModel.model_id;
        return this.http.put("http://localhost:3000/api/models/" + model_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ModelService.prototype.deleteModel = function (model_id) {
        return this.http.delete('http://localhost:3000/api/models/' + model_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    ModelService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ModelService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    ModelService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    ModelService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ModelService);
    return ModelService;
}());



/***/ }),

/***/ "./src/app/services/transmission-type/transmission-type.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/services/transmission-type/transmission-type.service.ts ***!
  \*************************************************************************/
/*! exports provided: TransmissionTypeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmissionTypeService", function() { return TransmissionTypeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var TransmissionTypeService = /** @class */ (function () {
    function TransmissionTypeService(http) {
        this.http = http;
        this.transmissionTypesUrl = '/api/transmissionTypes';
        this.putUrl = '/api/transmissionTypes';
        this.selectedTransmissionTypeId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    TransmissionTypeService.prototype.getTransmissionTypes = function () {
        return this.http.get('http://localhost:3000/api/transmissionTypes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransmissionTypeService.prototype.getTransmissionTypeById = function (transmission_type_id) {
        return this.http.get('http://localhost:3000/api/transmissionTypes/' + transmission_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransmissionTypeService.prototype.searchTransmissionTypes = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/transmissionTypes/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransmissionTypeService.prototype.createTransmissionType = function (newTransmissionType) {
        var body = JSON.stringify(newTransmissionType);
        return this.http.post('http://localhost:3000/api/transmissionTypes', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransmissionTypeService.prototype.updateTransmissionType = function (editTransmissionType) {
        var body = JSON.stringify(editTransmissionType);
        var transmission_type_id = editTransmissionType.transmission_type_id;
        return this.http.put("http://localhost:3000/api/transmissionTypes/" + transmission_type_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransmissionTypeService.prototype.deleteTransmissionType = function (transmission_type_id) {
        return this.http.delete('http://localhost:3000/api/transmissionTypes/' + transmission_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    TransmissionTypeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    TransmissionTypeService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    TransmissionTypeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    TransmissionTypeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TransmissionTypeService);
    return TransmissionTypeService;
}());



/***/ }),

/***/ "./src/app/services/variant/variant.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/variant/variant.service.ts ***!
  \*****************************************************/
/*! exports provided: VariantService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariantService", function() { return VariantService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var VariantService = /** @class */ (function () {
    function VariantService(http) {
        this.http = http;
        this.variantsUrl = '/api/variants';
        this.putUrl = '/api/variants';
        this.selectedVariantId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    VariantService.prototype.getVariants = function () {
        return this.http.get('http://localhost:3000/api/variants', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VariantService.prototype.getVariantById = function (variant_id) {
        return this.http.get('http://localhost:3000/api/variants/' + variant_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VariantService.prototype.searchVariants = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/variants/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VariantService.prototype.createVariant = function (newVariant) {
        var body = JSON.stringify(newVariant);
        return this.http.post('http://localhost:3000/api/variants', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VariantService.prototype.updateVariant = function (editVariant) {
        var body = JSON.stringify(editVariant);
        var variant_id = editVariant.variant_id;
        return this.http.put("http://localhost:3000/api/variants/" + variant_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VariantService.prototype.deleteVariant = function (variant_id) {
        return this.http.delete('http://localhost:3000/api/variants/' + variant_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VariantService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    VariantService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    VariantService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    VariantService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], VariantService);
    return VariantService;
}());



/***/ }),

/***/ "./src/app/services/vehicle-type/vehicle-type.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/services/vehicle-type/vehicle-type.service.ts ***!
  \***************************************************************/
/*! exports provided: VehicleTypeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleTypeService", function() { return VehicleTypeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: { 'Content-Type': 'application/json' }
};
var VehicleTypeService = /** @class */ (function () {
    function VehicleTypeService(http) {
        this.http = http;
        this.vehicleTypesUrl = '/api/vehicleTypes';
        this.putUrl = '/api/vehicleTypes';
        this.selectedVehicleTypeId = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.selectedMode = "Create";
        this.refreshList = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    VehicleTypeService.prototype.getVehicleTypes = function () {
        return this.http.get('http://localhost:3000/api/vehicleTypes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VehicleTypeService.prototype.getVehicleTypeById = function (vehicle_type_id) {
        return this.http.get('http://localhost:3000/api/vehicleTypes/' + vehicle_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VehicleTypeService.prototype.searchVehicleTypes = function (searchTerm) {
        return this.http.get('http://localhost:3000/api/vehicleTypes/search/' + searchTerm, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VehicleTypeService.prototype.createVehicleType = function (newVehicleType) {
        var body = JSON.stringify(newVehicleType);
        return this.http.post('http://localhost:3000/api/vehicleTypes', body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VehicleTypeService.prototype.updateVehicleType = function (editVehicleType) {
        var body = JSON.stringify(editVehicleType);
        var vehicle_type_id = editVehicleType.vehicle_type_id;
        return this.http.put("http://localhost:3000/api/vehicleTypes/" + vehicle_type_id, body, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VehicleTypeService.prototype.deleteVehicleType = function (vehicle_type_id) {
        return this.http.delete('http://localhost:3000/api/vehicleTypes/' + vehicle_type_id, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .map(function (res) { return res; });
    };
    VehicleTypeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    VehicleTypeService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(error.message || error);
    };
    VehicleTypeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
    };
    VehicleTypeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], VehicleTypeService);
    return VehicleTypeService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map