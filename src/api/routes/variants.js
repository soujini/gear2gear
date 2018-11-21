var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/variants', function(req, res) {
  client.query('SELECT * from public.variant' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});
router.get('/api/variants/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.variant where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/variants", function(req, res) {
  client.query("INSERT INTO public.variant (variant_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning variant_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });
});

router.get("/api/variants/:id", function(req, res) {
  var variantId = parseInt(req.params.id);
  client.query('select * from public.variant where variant_id = '+variantId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.put("/api/variants/:id", function(req, res) {
  var variantId = parseInt(req.params.id);
  client.query("update public.variant set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where variant_id = "+variantId,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result);
    }
  });
});

router.delete("/api/variants/:id", function(req, res) {
  var variantId = parseInt(req.params.id);
  client.query('delete from public.variant where variant_id = '+variantId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result);
    }
  });
});

module.exports = router;
