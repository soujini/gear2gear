var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/api/clients', function(req, res) {
  client.query('SELECT * from public.client' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.get('/api/investors', function(req, res) {
  client.query('SELECT * from public.client where is_investor=true' , function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);

    }
  });
});

//Get Investors Total Expense, Investors Investment+Expenses Percent,
//Total_Cost and Total_Income of the car
router.get("/api/investors/investorsExpensesAndPercent/:id", function(req, res) {

  var car_id = parseInt(req.params.id);

  client.query(
    'SELECT B.car_id, investor_id, SUM(A.DEBIT) AS INVESTORS_TOTAL_EXPENSES,'+
    'cast(SUM(A.DEBIT) as decimal(10,2))/cast(B.TOTAL_COST/100 as DECIMAL(10,2)) as INVESTORS_PERCENT,'+
    'B.TOTAL_COST AS CAR_TOTAL_COST, B.TOTAL_INCOME AS CAR_TOTAL_INCOME '+
    'FROM PUBLIC.TRANSACTION_DETAILS A, PUBLIC.CAR B '+
    'WHERE A.CAR_ID = '+ car_id +' AND B.CAR_ID = '+ car_id +
    'AND A.DEBIT IS NOT NULL '+
    'GROUP BY A.INVESTOR_ID, B.CAR_ID',

    function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.get('/api/clients/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.client where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows);
    }
  });
});

router.post("/api/clients", function(req, res) {
  client.query("INSERT INTO public.client(client_id, name, created_by, create_date, phone, email, address, city, state, pin, is_investor, is_owner) VALUES(DEFAULT, $1, 1, CURRENT_TIMESTAMP,$2,$3,$4,$5,$6, $7, $8, $9) returning client_id",
  [req.body.name, req.body.phone, req.body.email, req.body.address, req.body.city,req.body.state,req.body.pin, req.body.is_investor, req.body.is_owner],
  function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.status(200).send(result.rows[0]);
    }
  });
});

router.get("/api/clients/:id", function(req, res) {
  var clientId = parseInt(req.params.id);
  client.query('select * from public.client where client_id = '+clientId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else if (result.rows.length >= 1){
      res.status(200).send(result.rows);
    }
    else{
      res.status(200).send({message:"No records found."});
    }
  });

});

router.put("/api/clients/:id", function(req, res) {
  var clientId = parseInt(req.params.id);

  client.query("update public.client set name = $1, updated_by=1, update_date=CURRENT_TIMESTAMP, phone=$2, email=$3, address=$4, city=$5, state=$6, pin=$7, is_investor=$8, is_owner = $9 where client_id = "+clientId,
  [req.body.name, req.body.phone, req.body.email, req.body.address, req.body.city,req.body.state,req.body.pin,req.body.is_investor, req.body.is_owner],
  function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
});

router.delete("/api/clients/:id", function(req, res) {
  var clientId = parseInt(req.params.id);
  client.query('delete from public.client where client_id = '+clientId, function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});
function formatCurrency(val){
  let val1 = ''+val;
  let x = val1.replace( /,/g, "" );
  var afterPoint = '';
  if(x.indexOf('.') > 0)
  afterPoint = x.substring(x.indexOf('.'),x.length);
  x = Math.floor(x);
  x=x.toString();
  var lastThree = x.substring(x.length-3);
  var otherNumbers = x.substring(0,x.length-3);
  if(otherNumbers != '')
  lastThree = ',' + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  return res;
}
module.exports = router;
