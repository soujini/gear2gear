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

router.get('/api/makes', function(req, res) {
  let query = 'SELECT * from public.make';
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

router.get('/api/makes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.make where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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

router.post("/api/makes", function(req, res) {
  const query = 'INSERT INTO public.make(make_id, name, created_by, create_date) '+
  'VALUES(DEFAULT, ${name}, 1, CURRENT_TIMESTAMP) '+
  'returning make_id';
  const values = [req.body.name];

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

router.get("/api/makes/:id", function(req, res) {
  var makeId = parseInt(req.params.id);
  client.query('select * from public.make where make_id = '+makeId, function(err,result) {
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

router.put("/api/makes/:id", function(req, res) {
  var makeId = parseInt(req.params.id);
  client.query("update public.make set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where make_id = "+makeId,[req.body.name], function(err,result) {
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


router.delete("/api/makes/:id", function(req, res) {
  var makeId = parseInt(req.params.id);
  client.query('delete from public.make where make_id = '+makeId, function(err,result) {
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
