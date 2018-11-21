var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/transactionTypes', function(req, res) {
  let query = 'SELECT * from public.transaction_type where is_hidden = false';
  client.query(query, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
        res.status(200).send(result.rows);
      }
  });
});
router.get('/api/transactionTypes/client', function(req, res) {
  let query = 'SELECT * from public.transaction_type where transaction_type_id in (1,11)';
  client.query(query, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
        res.status(200).send(result.rows);
      }
  });
});

router.get('/api/transactionTypes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.transaction_type where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
        res.status(200).send(result.rows);
      }
  });
});

router.post("/api/transactionTypes", function(req, res) {
  const query = 'INSERT INTO public.transaction_type(transaction_type_id, name, is_hidden, created_by, create_date) '+
  'VALUES(DEFAULT, $1, $2, 1, CURRENT_TIMESTAMP) '+
  'returning transaction_type_id';
  const values = [req.body.name, false];

  client.query(query, values, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
        res.status(200).send(result.rows[0]);
      }
  });
});

router.get("/api/transactionTypes/:id", function(req, res) {
  var transaction_typeId = parseInt(req.params.id);
  client.query('select * from public.transaction_type where transaction_type_id = '+transaction_typeId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });

});

router.put("/api/transactionTypes/:id", function(req, res) {
  var transaction_typeId = parseInt(req.params.id);
  client.query("update public.transaction_type set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where transaction_type_id = "+transaction_typeId,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result);
    }
  });
});

router.delete("/api/transactionTypes/:id", function(req, res) {
  var transaction_typeId = parseInt(req.params.id);
  client.query('delete from public.transaction_type where transaction_type_id = '+transaction_typeId, function(err,result) {
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
