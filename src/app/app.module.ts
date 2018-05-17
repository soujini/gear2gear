// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
//
// import { AppRoutingModule } from './app-routing.module';
//
// import { AuthService } from './auth/auth.service';
//
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './components/header/header.component';
//
// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     MDBBootstrapModule.forRoot()
//   ],
//   schemas: [ NO_ERRORS_SCHEMA ],
//   providers: [AuthService],
//   bootstrap: [
//     AppComponent,
//     HeaderComponent
//   ]
// })
// export class AppModule { }



import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { ROUTES } from './app.routes';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { HeaderComponent } from './components/header/header.component';
import { ModelComponent } from './components/model/model.component';
import { VariantComponent } from './components/variant/variant.component';
import { VehicleTypeComponent } from './components/vehicle-type/vehicle-type.component';
import { FuelTypeComponent } from './components/fuel-type/fuel-type.component';
import { TransmissionTypeComponent } from './components/transmission-type/transmission-type.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { InsuranceTypeComponent } from './components/insurance-type/insurance-type.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { MakeService } from './services/make.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    HeaderComponent,
    ModelComponent,
    VariantComponent,
    VehicleTypeComponent,
    FuelTypeComponent,
    TransmissionTypeComponent,
    InsuranceComponent,
    InsuranceTypeComponent,
    ColorComponent,
    CarComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService,MakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
