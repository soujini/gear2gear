var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();
// const env = require('dotenv').config();

router.get('/api/models', function(req, res) {
  client.query('SELECT * from public.model' , function(err,result) {
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
router.get('/api/models/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.model where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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

router.post("/api/models", function(req, res) {
  client.query("INSERT INTO public.model (model_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning model_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows[0]);
  });
  //  client.end(); // closing the connection;
});

router.get("/api/models/:id", function(req, res) {
  var modelId = parseInt(req.params.id);
  client.query('select * from public.model where model_id = '+modelId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

router.put("/api/models/:id", function(req, res) {
  var modelId = parseInt(req.params.id);
  client.query("update public.model set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where model_id = "+modelId,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
    // client.end(); // closing the connection;
});


router.delete("/api/models/:id", function(req, res) {
  var modelId = parseInt(req.params.id);
  client.query('delete from public.model where model_id = '+modelId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
    // client.end(); // closing the connection;
});

module.exports = router;
