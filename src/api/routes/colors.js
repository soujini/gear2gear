var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/colors', function(req, res) {
  client.query('SELECT * from public.color' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);

    }
  });
});
router.get('/api/colors/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.color where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/colors", function(req, res) {
  client.query("INSERT INTO public.color (color_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning color_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });

});

router.get("/api/colors/:id", function(req, res) {
  var colorId = parseInt(req.params.id);
  client.query('select * from public.color where color_id = '+colorId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });

});

router.put("/api/colors/:id", function(req, res) {
  var colorId = parseInt(req.params.id);
  client.query("update public.color set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where color_id = "+colorId,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
    res.status(200).send(result);
  }
  });

});


router.delete("/api/colors/:id", function(req, res) {
  var colorId = parseInt(req.params.id);
  client.query('delete from public.color where color_id = '+colorId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });

});

module.exports = router;
