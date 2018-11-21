const { Client } = require('pg');
var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();
// const env = require('dotenv').config();
const app = express();

router.get('/api/makes', function(req, res) {
  let query = 'SELECT * from public.make';
  client.query(query, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
      //client.end(); // closing the connection;
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
        res.status(200).send(result.rows);
    }
  });
});

router.post("/api/makes", function(req, res) {
  const query = 'INSERT INTO public.make(make_id, name, created_by, create_date) '+
  'VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) '+
  'returning make_id';
  const values = [req.body.name];

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
});

module.exports = router;
