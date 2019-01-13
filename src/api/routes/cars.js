var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

// const env = require('dotenv').config();

const shouldAbort = (err) => {
  if (err) {
    console.error('Error in transaction', err.stack)
    client.query('ROLLBACK', (err) => {
      if (err) {
        console.error('Error rolling back client', err.stack)
        res.status(400).send(err);
      }
      // release the client back to the pool
      // done();
    });
  }
  return !!err
}

router.get('/api/cars', function(req, res) {

  client.query(
    'SELECT C.*, MK.NAME AS MAKE_NAME, MD.NAME AS MODEL_NAME, V.NAME AS VARIANT_NAME, '+
    'VT.NAME AS VEHICLE_TYPE_NAME, FT.NAME AS FUEL_TYPE_NAME, TT.NAME AS TRANSMISSION_TYPE_NAME, '+
    'C1.NAME AS PURCHASED_FROM_NAME, C2.NAME AS SOLD_TO_NAME, '+
    'C.sold_on::date - C.purchased_on::date as aging_days '+
    'FROM PUBLIC.CAR C '+
    'LEFT JOIN PUBLIC.MAKE MK ON C.MAKE = MK.MAKE_ID '+
    'LEFT JOIN PUBLIC.VARIANT V ON C.VARIANT = V.VARIANT_ID '+
    'LEFT JOIN PUBLIC.MODEL MD ON C.MODEL = MD.MODEL_ID ' +
    'LEFT JOIN PUBLIC.VEHICLE_TYPE VT ON C.VEHICLE_TYPE = VT.VEHICLE_TYPE_ID '+
    'LEFT JOIN PUBLIC.FUEL_TYPE FT ON C.FUEL_TYPE = FT.FUEL_TYPE_ID '+
    'LEFT JOIN PUBLIC.TRANSMISSION_TYPE TT ON C.TRANSMISSION_TYPE = TT.TRANSMISSION_TYPE_ID '+
    'LEFT JOIN PUBLIC.CLIENT C1 ON C.PURCHASED_FROM = C1.CLIENT_ID '+
    'LEFT JOIN PUBLIC.CLIENT C2 ON C.SOLD_TO = C2.CLIENT_ID ',
    function(err,result) {
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      else{
        res.status(200).send(result.rows);
      }
    });
  });

  router.get('/api/available-cars', function(req, res) {
    var is_sold  = req.query.is_sold;
    var make = parseInt(req.query.make);
    var model = parseInt(req.query.model);
    var variant = parseInt(req.query.variant);
    var vehicle_type = parseInt(req.query.vehicle_type);
    var fuel_type = parseInt(req.query.fuel_type);
    var transmission_type = parseInt(req.query.transmission_type);

    client.query(
      'SELECT'+
      ' MK.NAME AS MAKE_NAME,'+
      ' MD.NAME AS MODEL_NAME,'+
      ' V.NAME AS VARIANT_NAME,'+
      ' C.CAR_ID, C.DESCRIPTION, C.MILEAGE, C.MAKE_YEAR, C.MAKE_MONTH,C.IS_ACCIDENTAL,'+
      ' C.IS_FLOODED,C.INSURANCE_YEAR, C.OWNERS,C.EXTERIOR_COLOR, C.INTERIOR_COLOR, C.SELLING_PRICE, C.LICENSE_PLATE,'+
      ' VT.NAME AS VEHICLE_TYPE_NAME,'+
      ' FT.NAME AS FUEL_TYPE_NAME,'+
      ' TT.NAME AS TRANSMISSION_TYPE_NAME,'+
      ' I.NAME AS INSURANCE_NAME'+

      ' FROM PUBLIC.CAR C'+

      ' LEFT JOIN PUBLIC.MAKE MK ON C.MAKE = MK.MAKE_ID'+
      ' LEFT JOIN PUBLIC.MODEL MD ON C.MODEL = MD.MODEL_ID'+
      ' LEFT JOIN PUBLIC.VARIANT V ON C.VARIANT = V.VARIANT_ID'+
      ' LEFT JOIN PUBLIC.VEHICLE_TYPE VT ON C.VEHICLE_TYPE = VT.VEHICLE_TYPE_ID'+
      ' LEFT JOIN PUBLIC.FUEL_TYPE FT ON C.FUEL_TYPE = FT.FUEL_TYPE_ID'+
      ' LEFT JOIN PUBLIC.TRANSMISSION_TYPE TT ON C.TRANSMISSION_TYPE = TT.TRANSMISSION_TYPE_ID'+
      ' LEFT JOIN PUBLIC.INSURANCE I ON C.INSURANCE = I.INSURANCE_ID'+

      ' WHERE C.IS_SOLD='+is_sold+
      ' AND ('+make+' = 0 or c.make='+make+')'+
      ' AND ('+model+' = 0 or c.model='+model+')'+
      ' AND ('+variant+' = 0 or c.variant='+variant+')'+
      ' AND ('+vehicle_type+' = 0 or c.vehicle_type='+vehicle_type+')'+
      ' AND ('+fuel_type+' = 0 or c.fuel_type='+fuel_type+')'+
      ' AND ('+transmission_type+' = 0 or c.transmission_type='+transmission_type+')',

      function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        else{
          res.status(200).send(result.rows);
        }
      });
    });

      router.get('/api/cars/search/:searchTerm', function(req, res) {
        const searchTerm  = req.params.searchTerm.toLowerCase();
        client.query("SELECT * from public.car where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else{
            res.status(200).send(result.rows);
          }
        });
      });

      router.post("/api/cars", function(req, res) {
        if(req.body.cost_price){
          req.body.cost_price = req.body.cost_price.replace( /,/g, "" );
        }

        if(req.body.selling_price){
          req.body.selling_price = req.body.selling_price.replace( /,/g, "" );
        }
        if(req.body.mileage){
          req.body.mileage = req.body.mileage.replace( /,/g, "" );
        }

        client.query("INSERT INTO public.car(car_id, make, model, description, variant, vehicle_type, fuel_type, transmission_type, insurance, exterior_color, interior_color,fuel_economy, mileage, make_year, owners, cost_price, purchased_from, purchased_on, selling_price, sold_to, sold_on, make_month,insurance_year,is_accidental,is_flooded,is_sold,license_plate, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, 1, CURRENT_TIMESTAMP) returning car_id",[req.body.make,req.body.model,req.body_description, req.body.variant, req.body.vehicle_type, req.body.fuel_type, req.body.transmission_type, req.body.insurance, req.body.exterior_color,req.body.interior_color,req.body.fuel_economy, req.body.mileage, req.body.make_year, req.body.owners, req.body.cost_price, req.body.purchased_from, req.body.purchased_on, req.body.selling_price, req.body.sold_to, req.body.sold_on, req.body.make_month, req.body.insurance_year, req.body.is_accidental, req.body.is_flooded, req.body.is_sold, req.body.license_plate], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else{
            res.status(200).send(result.rows[0]);
          }
        });

      });

      router.get("/api/cars/:id", function(req, res) {
        var carId = parseInt(req.params.id);
        client.query('select * from public.car where car_id = '+carId, function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else if (result.rows.length >= 1){
            if(result.rows[0].cost_price){
              result.rows[0].cost_price = formatCurrency(result.rows[0].cost_price);
            }
            if(result.rows[0].selling_price){
              result.rows[0].selling_price = formatCurrency(result.rows[0].selling_price);
            }
            if(result.rows[0].mileage){
              result.rows[0].mileage = formatCurrency(result.rows[0].mileage);
            }
            res.status(200).send(result.rows);
          }
          else{
            res.status(200).send(result.rows);
          }
        });
      });

      router.put("/api/cars/:id", function(req, res) {
        var carId = parseInt(req.params.id);

        if(req.body.cost_price){
          req.body.cost_price = req.body.cost_price.replace( /,/g, "" );
        }
        if(req.body.selling_price){
          req.body.selling_price = req.body.selling_price.replace( /,/g, "" );
        }
        if(req.body.mileage){
          req.body.mileage = req.body.mileage.replace( /,/g, "" );
        }

        client.query("update public.car set make =$1, model=$2,description=$3, variant=$4, vehicle_type=$5, fuel_type=$6, transmission_type=$7, insurance=$8, exterior_color=$9, interior_color=$10, fuel_economy=$11, mileage=$12, make_year=$13, owners=$14, cost_price=$15, purchased_from=$16, purchased_on=$17 ,selling_price=$18, sold_to=$19, sold_on=$20, make_month=$21, insurance_year=$22, is_accidental=$23, is_flooded=$24, is_sold=$25, license_plate=$26, updated_by=1, update_date=CURRENT_TIMESTAMP where car_id = "+carId,[req.body.make,req.body.model,req.body.description, req.body.variant, req.body.vehicle_type, req.body.fuel_type, req.body.transmission_type, req.body.insurance, req.body.exterior_color,req.body.interior_color, req.body.fuel_economy, req.body.mileage, req.body.make_year, req.body.owners, req.body.cost_price, req.body.purchased_from, req.body.purchased_on, req.body.selling_price, req.body.sold_to, req.body.sold_on, req.body.make_month, req.body.insurance_year, req.body.is_accidental, req.body.is_flooded, req.body.is_sold, req.body.license_plate], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else{
            res.status(200).send(result);
          }
        });
      });

      router.delete("/api/cars/:id", function(req, res) {
        var carId = parseInt(req.params.id);
        client.query('delete from public.car where car_id = '+carId, function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else{
            res.status(200).send(result);
          }
          // res.status(200).send({message:"The client has been deleted successfully."});
        });

      });

      function formatCurrency(val){
        let val1 = ''+val;
        let x = val1.replace( /,/g, "" );
        var afterPoint = '';
        if(x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'),x.length);
        x = Math.floor(x);
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
        lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        return res;
      }
      module.exports = router;
