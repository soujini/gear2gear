
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MakeModule } from './components/make/make.module';
import { HomeComponent } from './components/home/home.component';
import { ModelComponent } from './components/model/model.component';
import { VariantComponent } from './components/variant/variant.component';
import { VehicleTypeComponent } from './components/vehicle-type/vehicle-type.component';
import { FuelTypeComponent } from './components/fuel-type/fuel-type.component';
import { TransmissionTypeComponent } from './components/transmission-type/transmission-type.component';
import { InsuranceTypeComponent } from './components/insurance-type/insurance-type.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';

declare var require:any;

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {
    path: 'make',
    loadChildren: './components/make/make-routing.module#MakeRoutingModule'

  },
  { path: 'model', component: ModelComponent},
  { path: 'variant', component: VariantComponent},
  { path: 'vehicleType', component: VehicleTypeComponent},
  { path: 'fuelType', component: FuelTypeComponent},
  { path: 'transmissionType', component: TransmissionTypeComponent},
  { path: 'insuranceType', component: InsuranceTypeComponent},
  { path: 'insurance', component: InsuranceComponent},
  { path: 'color', component: ColorComponent},
  { path: 'car', component: HomeComponent},
  { path: 'available-cars', component: HomeComponent},
  { path: 'sold-cars', component: HomeComponent},
  { path: 'investors-corner', component: HomeComponent},
  { path: 'contact', component: HomeComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ enableTracing: false }),
    MakeModule
  ],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
