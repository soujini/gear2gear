var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/expenses', function(req, res) {
  client.query('SELECT * from public.expenses' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});
router.get('/api/expenses/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.expenses where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/expenses", function(req, res) {
  client.query("INSERT INTO public.expenses (expense_id, name, created_by, create_date) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP) returning expense_id",[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });

});

router.get("/api/expenses/:id", function(req, res) {
  var expense_id = parseInt(req.params.id);
  client.query('select * from public.expenses where expense_id = '+expense_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });

});

router.put("/api/expenses/:id", function(req, res) {
  var expense_id = parseInt(req.params.id);
  client.query("update public.expenses set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP where expense_id = "+expense_id,[req.body.name], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result);
    }
  });

});

router.delete("/api/expenses/:id", function(req, res) {
  var expense_id = parseInt(req.params.id);
  client.query('delete from public.expenses where expense_id = '+expense_id, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });

});

module.exports = router;
