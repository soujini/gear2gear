
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MakeModule } from './components/make/make.module';
import { ModelModule } from './components/model/model.module';
import { VariantModule } from './components/variant/variant.module';
import { VehicleTypeModule } from './components/vehicle-type/vehicle-type.module';
import { FuelTypeModule } from './components/fuel-type/fuel-type.module';
import { InsuranceTypeModule } from './components/insurance-type/insurance-type.module';
import { TransmissionTypeModule } from './components/transmission-type/transmission-type.module';
import { InsuranceModule } from './components/insurance/insurance.module';
import { ColorModule } from './components/color/color.module';
import { CarModule } from './components/car/car.module';
import { ClientModule } from './components/client/client.module';
import { ExpenseModule } from './components/expense/expense.module';
import { InventoryModule } from './components/inventory/inventory.module';
import { InvestorsCornerModule } from './components/investors-corner/investors-corner.module';

import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';

declare var require:any;

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {
    path: 'make',
    loadChildren: './components/make/make-routing.module#MakeRoutingModule'

  },
  {
    path: 'model',
    loadChildren: './components/model/model-routing.module#ModelRoutingModule'
  },
  {
    path: 'variant',
    loadChildren: './components/variant/variant-routing.module#VariantRoutingModule'
  },
  {
    path: 'vehicleType',
    loadChildren: './components/vehicle-type/vehicle-type-routing.module#VehicleTypeRoutingModule'
  },
  {
    path: 'fuelType',
    loadChildren: './components/fuel-type/fuel-type-routing.module#FuelTypeRoutingModule'
  },
  {
    path: 'transmissionType',
    loadChildren: './components/transmission-type/transmission-type-routing.module#TransmissionTypeRoutingModule'
  },
  {
    path: 'insuranceType',
    loadChildren: './components/insurance-type/insurance-type-routing.module#InsuranceTypeRoutingModule'
  },
  {
    path: 'insurance',
    loadChildren: './components/insurance/insurance-routing.module#InsuranceRoutingModule'
  },
  {
    path: 'expense',
    loadChildren: './components/expense/expense-routing.module#ExpenseRoutingModule'
  },
  {
    path: 'color',
    loadChildren: './components/color/color-routing.module#ColorRoutingModule'
  },
  {
    path: 'client',
    loadChildren: './components/client/client-routing.module#ClientRoutingModule'
  },
  {
    path: 'car',
    loadChildren: './components/car/car-routing.module#CarRoutingModule'
  },
  { path: 'cars', component: InventoryComponent},
  { path: 'sold-cars', component: HomeComponent},
  {
    path: 'investors-corner',
    loadChildren: './components/investors-corner/investors-corner-routing.module#InvestorsCornerRoutingModule'
  },
  { path: 'contact', component: HomeComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ enableTracing: false }),
    MakeModule,
    ModelModule,
    VariantModule,
    VehicleTypeModule,
    FuelTypeModule,
    InsuranceTypeModule,
    TransmissionTypeModule,
    InsuranceModule,
    ExpenseModule,
    ColorModule,
    ClientModule,
    CarModule,
    InventoryModule,
    InvestorsCornerModule
  ],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
