const { Client } = require('pg');
const express = require('express');
const http = require('http');
const router = express.Router();

/* Connect to local postgres db before starting the application server*/
const client = new Client({
// connectionString: process.env.DATABASE_URL,
  connectionString:'postgres://localhost:5432/postgres',
  ssl: false,
  //  database: 'postgres',
  //   user: 'postgres',
  //    port: 5432
});
client.connect(function(err,client,done) {
  if(err){
    console.log("Failed to connect to the database "+ err);
    
  }
});

router.get('/api/vehicleTypes', function(req, res) {
  client.query('SELECT * from public.vehicle_type' , function(err,result) {
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
router.get('/api/vehicleTypes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.vehicle_type where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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

router.post("/api/vehicleTypes", function(req, res) {
  client.query("INSERT INTO public.vehicle_type (vehicle_type_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning vehicle_type_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows[0]);
  });
  //  client.end(); // closing the connection;
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
    // client.end(); // closing the connection;
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
    // client.end(); // closing the connection;
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
    // client.end(); // closing the connection;
});

module.exports = router;
