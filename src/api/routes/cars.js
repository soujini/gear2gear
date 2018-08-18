var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();
// const env = require('dotenv').config();

router.get('/api/cars', function(req, res) {

  client.query(
    'SELECT C.*, MK.NAME AS MAKE_NAME, MD.NAME AS MODEL_NAME '+
    'FROM PUBLIC.CAR C '+
    'LEFT JOIN PUBLIC.MAKE MK ON C.MAKE = MK.MAKE_ID '+
    'LEFT JOIN PUBLIC.MODEL MD ON C.MODEL = MD.MODEL_ID ',
    function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{

      res.status(200).send(result.rows);
      // client.end(); // closing the connection;
    }
  });
});

  router.get('/api/available-cars', function(req, res) {
    client.query(
      'SELECT '+
      'MK.NAME AS MAKE_NAME,'+
      'MD.NAME AS MODEL_NAME,'+
      'V.NAME AS VARIANT_NAME,'+
      'C.DESCRIPTION, C.MILEAGE, C.MAKE_YEAR, C.MAKE_MONTH,C.IS_ACCIDENTAL,'+
      'C.IS_FLOODED,C.INSURANCE_YEAR, C.OWNERS,C.EXTERIOR_COLOR, C.INTERIOR_COLOR, C.SELLING_PRICE, C.LICENSE_PLATE, '+
      'VT.NAME AS VEHICLE_TYPE_NAME,'+
      'FT.NAME AS FUEL_TYPE_NAME,'+
      'TT.NAME AS TRANSMISSION_TYPE_NAME,'+
      'IT.NAME AS INSURANCE_TYPE_NAME,'+
      'I.NAME AS INSURANCE_NAME '+

      'FROM PUBLIC.CAR C '+

      'LEFT JOIN PUBLIC.MAKE MK ON C.MAKE = MK.MAKE_ID '+
      'LEFT JOIN PUBLIC.MODEL MD ON C.MODEL = MD.MODEL_ID '+
      'LEFT JOIN PUBLIC.VARIANT V ON C.VARIANT = V.VARIANT_ID '+
      'LEFT JOIN PUBLIC.VEHICLE_TYPE VT ON C.VEHICLE_TYPE = VT.VEHICLE_TYPE_ID '+
      'LEFT JOIN PUBLIC.FUEL_TYPE FT ON C.FUEL_TYPE = FT.FUEL_TYPE_ID '+
      'LEFT JOIN PUBLIC.TRANSMISSION_TYPE TT ON C.TRANSMISSION_TYPE = TT.TRANSMISSION_TYPE_ID '+
      'LEFT JOIN PUBLIC.INSURANCE_TYPE IT ON C.INSURANCE_TYPE = IT.INSURANCE_TYPE_ID '+
      'LEFT JOIN PUBLIC.INSURANCE I ON C.INSURANCE = I.INSURANCE_ID '+

      'WHERE C.IS_SOLD=false',
      function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        else{

          res.status(200).send(result.rows);
          // client.end(); // closing the connection;
        }
      });
    });
    router.get('/api/sold-cars', function(req, res) {
      client.query(
        'SELECT '+
        'MK.NAME AS MAKE_NAME,'+
        'MD.NAME AS MODEL_NAME,'+
        'V.NAME AS VARIANT_NAME,'+
        'C.DESCRIPTION, C.MILEAGE, C.MAKE_YEAR, C.MAKE_MONTH,C.IS_ACCIDENTAL,'+
        'C.IS_FLOODED,C.INSURANCE_YEAR, C.OWNERS,C.EXTERIOR_COLOR, C.INTERIOR_COLOR,C.SELLING_PRICE, C.LICENSE_PLATE'+
        'VT.NAME AS VEHICLE_TYPE_NAME,'+
        'FT.NAME AS FUEL_TYPE_NAME,'+
        'TT.NAME AS TRANSMISSION_TYPE_NAME,'+
        'IT.NAME AS INSURANCE_TYPE_NAME,'+
        'I.NAME AS INSURANCE_NAME '+

        'FROM PUBLIC.CAR C '+

        'LEFT JOIN PUBLIC.MAKE MK ON C.MAKE = MK.MAKE_ID '+
        'LEFT JOIN PUBLIC.MODEL MD ON C.MODEL = MD.MODEL_ID '+
        'LEFT JOIN PUBLIC.VARIANT V ON C.VARIANT = V.VARIANT_ID '+
        'LEFT JOIN PUBLIC.VEHICLE_TYPE VT ON C.VEHICLE_TYPE = VT.VEHICLE_TYPE_ID '+
        'LEFT JOIN PUBLIC.FUEL_TYPE FT ON C.FUEL_TYPE = FT.FUEL_TYPE_ID '+
        'LEFT JOIN PUBLIC.TRANSMISSION_TYPE TT ON C.TRANSMISSION_TYPE = TT.TRANSMISSION_TYPE_ID '+
        'LEFT JOIN PUBLIC.INSURANCE_TYPE IT ON C.INSURANCE_TYPE = IT.INSURANCE_TYPE_ID '+
        'LEFT JOIN PUBLIC.INSURANCE I ON C.INSURANCE = I.INSURANCE_ID '+

        'WHERE C.IS_SOLD=TRUE',
        function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else{

            res.status(200).send(result.rows);
            // client.end(); // closing the connection;
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
            // client.end(); // closing the connection;
          }
        });
      });

      router.post("/api/cars", function(req, res) {
        if(req.body.cost_price){
          req.body.cost_price = req.body.cost_price.replace( /,/g, "" );
        }
        if(req.body.total_cost){
          req.body.total_cost = req.body.total_cost.replace( /,/g, "" );
        }
        if(req.body.selling_price){
          req.body.selling_price = req.body.selling_price.replace( /,/g, "" );
        }
        if(req.body.mileage){
          req.body.mileage = req.body.mileage.replace( /,/g, "" );
        }

        client.query("INSERT INTO public.car(car_id, make, model, description, variant, vehicle_type, fuel_type, transmission_type, insurance_type, insurance, exterior_color, interior_color,fuel_economy, mileage, make_year, owners, cost_price, purchased_from, purchased_on, selling_price, sold_to, sold_on, make_month,insurance_year,is_accidental,is_flooded,is_sold,license_plate,total_cost, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 1, CURRENT_TIMESTAMP) returning car_id",[req.body.make,req.body.model,req.body_description, req.body.variant, req.body.vehicle_type, req.body.fuel_type, req.body.transmission_type, req.body.insurance_type, req.body.insurance, req.body.exterior_color,req.body.interior_color,req.body.fuel_economy, req.body.mileage, req.body.make_year, req.body.owners, req.body.cost_price, req.body.purchased_from, req.body.purchased_on, req.body.selling_price, req.body.sold_to, req.body.sold_on, req.body.make_month, req.body.insurance_year, req.body.is_accidental, req.body.is_flooded, req.body.is_sold, req.body.license_plate,req.body.total_cost], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send(result.rows[0]);
        });
        //  client.end(); // closing the connection;
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
            res.status(200).send({message:"No records found."});
          }
        });
        // client.end(); // closing the connection;
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

        client.query("update public.car set make =$1, model=$2,description=$3, variant=$4, vehicle_type=$5, fuel_type=$6, transmission_type=$7, insurance_type=$8, insurance=$9, exterior_color=$10, interior_color=$11, fuel_economy=$12, mileage=$13, make_year=$14, owners=$15, cost_price=$16, purchased_from=$17, purchased_on=$18 ,selling_price=$19, sold_to=$20, sold_on=$21, make_month=$22, insurance_year=$23, is_accidental=$24, is_flooded=$25, is_sold=$26, license_plate=$27, updated_by=1, update_date=CURRENT_TIMESTAMP where car_id = "+carId,[req.body.make,req.body.model,req.body.description, req.body.variant, req.body.vehicle_type, req.body.fuel_type, req.body.transmission_type, req.body.insurance_type, req.body.insurance, req.body.exterior_color,req.body.interior_color, req.body.fuel_economy, req.body.mileage, req.body.make_year, req.body.owners, req.body.cost_price, req.body.purchased_from, req.body.purchased_on, req.body.selling_price, req.body.sold_to, req.body.sold_on, req.body.make_month, req.body.insurance_year, req.body.is_accidental, req.body.is_flooded, req.body.is_sold, req.body.license_plate], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send({message:"Changes made to the client have been saved successfully."});
        });
        // client.end(); // closing the connection;
      });

      router.patch("/api/cars/:id", function(req, res) {
        var carId = req.params.id;

        client.query("update public.car set total_cost = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where car_id = "+carId,
        [req.body.total_cost],
        function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send(result);
        });
        // client.end(); // closing the connection;
      });
      router.patch("/api/cars/income/:id", function(req, res) {
        var carId = req.params.id;

        client.query("update public.car set total_income = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where car_id = "+carId,
        [req.body.total_income],
        function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send(result);
        });
        // client.end(); // closing the connection;
      });


      router.delete("/api/cars/:id", function(req, res) {
        var carId = parseInt(req.params.id);
        client.query('delete from public.car where car_id = '+carId, function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send({message:"The client has been deleted successfully."});
        });
        // client.end(); // closing the connection;
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
