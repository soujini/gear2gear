var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/insurances', function(req, res) {
  client.query('SELECT * from public.insurance' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});
router.get('/api/insurances/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.insurance where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/insurances", function(req, res) {
  client.query("INSERT INTO public.insurance (insurance_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning insurance_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });
});

router.get("/api/insurances/:id", function(req, res) {
  var insuranceId = parseInt(req.params.id);
  client.query('select * from public.insurance where insurance_id = '+insuranceId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.put("/api/insurances/:id", function(req, res) {
  var insuranceId = parseInt(req.params.id);
  client.query("update public.insurance set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where insurance_id = "+insuranceId,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result);
    }
  });
});

router.delete("/api/insurances/:id", function(req, res) {
  var insuranceId = parseInt(req.params.id);
  client.query('delete from public.insurance where insurance_id = '+insuranceId, function(err,result) {
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
