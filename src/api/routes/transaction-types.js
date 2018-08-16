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
    // res.status(400).send(err);
  }
});

router.get('/api/transactionTypes', function(req, res) {
  let query = 'SELECT * from public.transaction_type where is_hidden = false';
  client.query(query, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      if(result.rows.length >= 1){
      //  res.status(200).send(result.rows);
      res.status(200).send(result.rows);
      }
      else{
        res.status(200).send({message: "No records found."});
      }
      // client.end(); // closing the connection;
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
      if(result.rows.length >= 1){
        res.status(200).send(result.rows);
      }
      else{
        res.status(200).send({message: "No matching records found."});
      }
      // client.end(); // closing the connection;
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
      if(result.rows.length >= 1){
        res.status(200).send(result.rows[0]);
      }
      else{
        res.status(200).send({message: "No records found."});
      }
    }
  });
  //  client.end(); // closing the connection;
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
  // client.end(); // closing the connection;
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
  // client.end(); // closing the connection;
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
  // client.end(); // closing the connection;
});

module.exports = router;
