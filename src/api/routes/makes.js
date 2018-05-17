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

router.get('/api/makes', function(req, res) {
  client.query('SELECT * from public.make' , function(err,result) {
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
router.get('/api/makes/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  console.log("Search fields in make.js ",searchTerm);
  client.query("SELECT * from public.make where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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

  // req.body.age = parseInt(req.body.age);
  // db.none('insert into pups(name, breed, age, sex)' +
  //     'values(${name}, ${breed}, ${age}, ${sex})',
  //   req.body)
router.post("/api/makes", function(req, res) {
  client.query("INSERT INTO public.make (name) VALUES('Audi')", function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('Inserted Successfully');
  });
    // client.end(); // closing the connection;
});

router.get("/api/makes/:id", function(req, res) {
  var makeId = parseInt(req.params.id);
  client.query('select * from public.make where make_id = '+makeId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});


router.put("/api/makes/:id", function(req, res) {
  var makeId = parseInt(req.params.id);
  client.query('update public.make where make_id = '+makeId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
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
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

module.exports = router;
