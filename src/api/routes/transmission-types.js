var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/transmissionTypes', function(req, res) {
  client.query('SELECT * from public.transmission_type' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
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
    }
  });
});

router.post("/api/transmissionTypes", function(req, res) {
  client.query("INSERT INTO public.transmission_type (transmission_type_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning transmission_type_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });

});

router.get("/api/transmissionTypes/:id", function(req, res) {
  var transmission_type_id = parseInt(req.params.id);
  client.query('select * from public.transmission_type where transmission_type_id = '+transmission_type_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });

});

router.put("/api/transmissionTypes/:id", function(req, res) {
  var transmission_type_id = parseInt(req.params.id);
  client.query("update public.transmission_type set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where transmission_type_id = "+transmission_type_id,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.delete("/api/transmissionTypes/:id", function(req, res) {
  var transmission_type_id = parseInt(req.params.id);
  client.query('delete from public.transmission_type where transmission_type_id = '+transmission_type_id, function(err,result) {
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
