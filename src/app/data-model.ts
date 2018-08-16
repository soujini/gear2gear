export class Make {
  make_id: number;
  name: string;
}

export class Model {
  model_id:number;
  name:string;
}

export class Variant {
  variant_id:number;
  name: string;
}

export class VehicleType {
  vehicle_type_id:number;
  name:string;
}

export class FuelType {
  fuel_type_id:number;
  name:string;
}

export class TransmissionType {
  transmission_type_id:number;
  name:string;
}

export class InsuranceType {
  insurance_type_id:number;
  name:string;
}

export class Insurance {
  insurance_id:number;
  name:string;
}
export class Expense {
  expense_id:number;
  name:string;
}

export class Color {
  color_id:number;
  name:string;
}

export class Car {
  car_id:number;
  make:number;
  model:number;
  description:string;
  variant:number;
  vehicle_type:number;
  fuel_type:number;
  transmission_type:number;
  insurance_type:number;
  insurance:number;
  exterior_color:number;
  interior_color:number;
  fuel_economy:number;
  mileage:number;
  make_year:number;
  owners:number;
  cost_price:number;
  purchased_from:number;
  purchased_on;
  selling_price:number;
  sold_to:number;
  sold_on;
  make_month:number;
  insurance_year:number;
  is_accidental:boolean;
  is_flooded:boolean;
  is_sold:boolean;
  license_plate:string;
}

export class Client {
  client_id:number;
  name:string;
  phone:number;
  email:string;
  address:string;
  city:string;
  state:number;
  pin:string;
  is_investor:boolean=false;
  total_investment:number;
  total_expenses:number;
  available_balance:number;
}
export class TransactionType {
  transaction_type_id:number;
  name:string;
  mode:string;
}
export class TransactionDetails {
  transaction_details_id : number;
  transaction_type_id : number;
  car_id:number;
  investor_id:number;
  transaction_type_mode: number;
  description:string;
  date:string;
  expense_id:number;
  amount:number;
}

export const states = ['CA', 'MD', 'OH', 'VA'];
