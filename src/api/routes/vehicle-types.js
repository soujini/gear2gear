var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/vehicleTypes', function(req, res) {
  client.query('SELECT * from public.vehicle_type' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});
router.get('/api/vehicleTypes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.vehicle_type where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/vehicleTypes", function(req, res) {
  client.query("INSERT INTO public.vehicle_type (vehicle_type_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning vehicle_type_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });
});

router.get("/api/vehicleTypes/:id", function(req, res) {
  var vehicle_type_id = parseInt(req.params.id);
  client.query('select * from public.vehicle_type where vehicle_type_id = '+vehicle_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

router.put("/api/vehicleTypes/:id", function(req, res) {
  var vehicle_type_id = parseInt(req.params.id);
  client.query("update public.vehicle_type set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where vehicle_type_id = "+vehicle_type_id,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
});


router.delete("/api/vehicleTypes/:id", function(req, res) {
  var vehicle_type_id = parseInt(req.params.id);
  client.query('delete from public.vehicle_type where vehicle_type_id = '+vehicle_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

module.exports = router;
