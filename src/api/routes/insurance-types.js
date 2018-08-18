var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/insuranceTypes', function(req, res) {
  client.query('SELECT * from public.insurance_type' , function(err,result) {
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
router.get('/api/insuranceTypes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.insurance_type where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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

router.post("/api/insuranceTypes", function(req, res) {
  client.query("INSERT INTO public.insurance_type (insurance_type_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning insurance_type_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows[0]);
  });
  //  client.end(); // closing the connection;
});

router.get("/api/insuranceTypes/:id", function(req, res) {
  var insurance_type_id = parseInt(req.params.id);
  client.query('select * from public.insurance_type where insurance_type_id = '+insurance_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

router.put("/api/insuranceTypes/:id", function(req, res) {
  var insurance_type_id = parseInt(req.params.id);
  client.query("update public.insurance_type set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where insurance_type_id = "+insurance_type_id,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
    // client.end(); // closing the connection;
});


router.delete("/api/insuranceTypes/:id", function(req, res) {
  var insurance_type_id = parseInt(req.params.id);
  client.query('delete from public.insurance_type where insurance_type_id = '+insurance_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

module.exports = router;
