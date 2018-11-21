var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/fuelTypes', function(req, res) {
  client.query('SELECT * from public.fuel_type' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});
router.get('/api/fuelTypes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.fuel_type where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/fuelTypes", function(req, res) {
  client.query("INSERT INTO public.fuel_type (fuel_type_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning fuel_type_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });
});

router.get("/api/fuelTypes/:id", function(req, res) {
  var fuel_type_id = parseInt(req.params.id);
  client.query('select * from public.fuel_type where fuel_type_id = '+fuel_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

router.put("/api/fuelTypes/:id", function(req, res) {
  var fuel_type_id = parseInt(req.params.id);
  client.query("update public.fuel_type set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where fuel_type_id = "+fuel_type_id,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result);
    }
  });
});


router.delete("/api/fuelTypes/:id", function(req, res) {
  var fuel_type_id = parseInt(req.params.id);
  client.query('delete from public.fuel_type where fuel_type_id = '+fuel_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

module.exports = router;
