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
    res.status(400).send(err);
  }
});

router.get('/api/transmissionTypes', function(req, res) {
  client.query('SELECT * from public.transmission_type' , function(err,result) {
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
router.get('/api/transmissionTypes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.transmission_type where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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

router.post("/api/transmissionTypes", function(req, res) {
  client.query("INSERT INTO public.transmission_type (transmission_type_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning transmission_type_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows[0]);
  });
  //  client.end(); // closing the connection;
});

router.get("/api/transmissionTypes/:id", function(req, res) {
  var transmission_type_id = parseInt(req.params.id);
  client.query('select * from public.transmission_type where transmission_type_id = '+transmission_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

router.put("/api/transmissionTypes/:id", function(req, res) {
  var transmission_type_id = parseInt(req.params.id);
  client.query("update public.transmission_type set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where transmission_type_id = "+transmission_type_id,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
    // client.end(); // closing the connection;
});


router.delete("/api/transmissionTypes/:id", function(req, res) {
  var transmission_type_id = parseInt(req.params.id);
  client.query('delete from public.transmission_type where transmission_type_id = '+transmission_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

module.exports = router;
