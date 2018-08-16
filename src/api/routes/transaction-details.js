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

const shouldAbort = (err) => {
  if (err) {
    console.error('Error in transaction', err.stack)
    client.query('ROLLBACK', (err) => {
      if (err) {
        console.error('Error rolling back client', err.stack)
        res.status(400).send(err);
      }
      // release the client back to the pool
      // done();
    });
  }
  return !!err
}

router.get('/api/transactionDetails', function(req, res) {
  client.query('SELECT * from public.transaction_details order by date desc' , function(err,result) {
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
router.get('/api/transactionDetails/search/:searchTerm', function(req, res) {
  const searchTerm  = req.params.searchTerm.toLowerCase();
  client.query("SELECT * from public.transaction_details where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
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
router.get('/api/transactionDetails/totalInvestmentBalance/:car_id',function(req, res) {
  const car_id  = req.params.car_id;
  client.query(
    'SELECT SUM(debit) AS TOTAL_INVESTMENT, B.COST_PRICE, B.COST_PRICE-SUM(DEBIT) AS BALANCE '+
    'FROM PUBLIC.TRANSACTION_DETAILS A, PUBLIC.CAR B '+
    'WHERE A.CAR_ID = ' +car_id+' AND B.CAR_ID = ' +car_id+
    'AND TRANSACTION_TYPE_ID = 1 '+
    'GROUP BY A.CAR_ID, B.CAR_ID ',
    function(err,result) {
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

  router.post("/api/transactionDetails/profitAndLoss", function(req, res) {
    client.query('BEGIN', (err) => {
      req.body.forEach((investor) => {
        if (shouldAbort(err)) return

        var sql = "insert INTO public.transaction_details (transaction_details_id, transaction_type_id, car_id, investor_id, transaction_type_mode, description, date, expense_id, credit,debit, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6, $7, $8, 1, CURRENT_TIMESTAMP) returning transaction_details_id";
        var values = [investor.transaction_type_id, investor.car_id, investor.investor_id, investor.transaction_type_mode, investor.description, investor.expense_id, investor.credit, investor.debit];
        client.query(sql, values, function(err,result) {
          if(err){
            console.log("ERROR : ", err);
            if(shouldAbort(err)) return;
          }
          else{
            //Update Available Balance
            if(investor.transaction_type_mode == "credit"){//CREDIT
              client.query("UPDATE CLIENT set available_balance = available_balance + "+ investor.credit +
              "where client_id = "+investor.investor_id, (err, result) => {
                if (shouldAbort(err)) return
              });

              client.query("UPDATE CAR set is_sold = true where car_id = "+investor.car_id, (err, result) => {
                if (shouldAbort(err)) return
              });

              client.query('COMMIT', (err) => {
                if (err) {
                  console.error('Error committing transaction', err.stack)
                }
              });//End of commit
              res.status(200).send(res.rows);
            }

            else{ //Debit
              client.query("UPDATE CLIENT set available_balance = available_balance - "+ investor.debit +
              " where client_id = "+investor.investor_id, (err, result) => {
                if (shouldAbort(err)) return
              });
              client.query("UPDATE CAR set is_sold = true where car_id = "+investor.car_id, (err, result) => {
                if (shouldAbort(err)) return
              });
              client.query('COMMIT', (err) => {
                if (err) {
                  console.error('Error committing transaction', err.stack)
                }

              });//End of commit
              res.status(200).send(res.rows);
            }
          }
        });//End of INSERT
      });//End of foreach
    });//End of Begin
  });


  router.post("/api/transactionDetails", function(req, res) {

    if(req.body.credit){
      req.body.credit = req.body.credit.replace( /,/g, "" );
    }
    if(req.body.debit){
      req.body.debit = req.body.debit.replace( /,/g, "" );
    }
    if(req.body.balance){
      req.body.balance = req.body.balance.replace( /,/g, "" );
    }

    if(req.body.transaction_type_mode == "credit"){//CREDIT

      client.query('BEGIN', (err) => {
        if (shouldAbort(err)) return
        client.query("INSERT INTO public.transaction_details (transaction_details_id, transaction_type_id, car_id, investor_id, transaction_type_mode, description, date, expense_id, credit,debit, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, 1, CURRENT_TIMESTAMP) returning transaction_details_id",[req.body.transaction_type_id, req.body.car_id, req.body.investor_id, req.body.transaction_type_mode, req.body.description, req.body.date, req.body.expense_id, req.body.credit, req.body.debit], function(err,result) {
          if (err) {
            console.error('Error committing transaction', err.stack);
            if (shouldAbort(err)) return;
          }
          else{
            client.query("UPDATE car set total_income ="+req.body.cars_total_income +", updated_by=1, update_date=CURRENT_TIMESTAMP where car_id = "+[req.body.car_id], (err, res) => {
              if (shouldAbort(err)) return;
            });

            client.query('COMMIT', (err) => {
              if (err) {
                console.error('Error committing transaction', err.stack)
              }
            });
            res.status(200).send(res.rows);

          }//End of else

        });//End of Insert
      });//End Begin
    }
    else{//DEBIT
      req.body.credit=0;
      client.query('BEGIN', (err) => {
        if (shouldAbort(err)) return
        client.query("INSERT INTO public.transaction_details (transaction_details_id, transaction_type_id, car_id, investor_id, transaction_type_mode, description, date, expense_id, credit,debit, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, 1, CURRENT_TIMESTAMP) returning transaction_details_id",[req.body.transaction_type_id,req.body.car_id, req.body.investor_id, req.body.transaction_type_mode, req.body.description, req.body.date, req.body.expense_id, req.body.credit, req.body.debit], function(err,result) {
          if (err) {
            console.error('Error committing transaction', err.stack);
            if (shouldAbort(err)) return;
          }
          else{
            client.query("UPDATE car set total_cost = "+req.body.cars_total_cost +", updated_by=1, update_date=CURRENT_TIMESTAMP where car_id = "+[req.body.car_id], (err, res) => {
              if (shouldAbort(err)) return;
            });

            client.query("UPDATE client set available_balance = "+req.body.investors_available_balance +",total_expenses = "+req.body.investors_total_expenses +", updated_by=1, update_date=CURRENT_TIMESTAMP where client_id = "+[req.body.investor_id], (err, res) => {
              if (shouldAbort(err)) return;
            });

            client.query('COMMIT', (err) => {
              if (err) {
                console.error('Error committing transaction', err.stack)
              }
            });
            res.status(200).send(res.rows);
          }
        }); //End of insert
      });//End Begin
    }
  });
  router.get("/api/transactionDetails/:id", function(req, res) {
    var transaction_details_id = parseInt(req.params.id);
    client.query(
      'SELECT TD.*, E.NAME as EXPENSE_NAME, C.NAME as INVESTOR_NAME, TT.NAME AS TRANSACTION_NAME '+
      'FROM TRANSACTION_DETAILS TD '+
      'LEFT JOIN EXPENSES E ON TD.EXPENSE_ID = E.EXPENSE_ID '+
      'LEFT JOIN CLIENT C ON TD.INVESTOR_ID = C.CLIENT_ID '+
      'LEFT JOIN TRANSACTION_TYPE TT ON TD.TRANSACTION_TYPE_ID = TT.TRANSACTION_TYPE_ID '+
      'where car_id = '+transaction_details_id,
      function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        else{
          if(result.rows.credit){
            result.rows.credit = formatCurrency(result.rows.credit);
          }
          if(result.rows.debit){
            result.rows.debit = formatCurrency(result.rows.debit);
          }
          // if(result.rows.balance){
          //   result.rows.balance = formatCurrency(result.rows.balance);
          // }
          res.status(200).send(result.rows);
        }
      });
      // client.end(); // closing the connection;
    });
    //Get available balance
    router.get("/api/transactionDetails/balance/:id", function(req, res) {

      var car_id = parseInt(req.params.id);
      client.query('select balance from public.transaction_details order by create_date desc limit 1 where car_id = '+car_id, function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        else{
          if(result.rows[0].balance){
            result.rows[0].balance = formatCurrency(result.rows[0].balance);
          }
          res.status(200).send(result.rows);
        }
      });
      // client.end(); // closing the connection;
    });
    router.put("/api/transactionDetails/:id", function(req, res) {
      var transaction_details_id = parseInt(req.params.id);
      client.query("update public.transaction_details set transaction_type_id = $1, car_id= $2, investor_id=$3, transaction_type_mode=$4, description=$5, date= $6, expense_id=$7, credit=$8, debit=$9, balance=$10,  updated_by=1, update_date=CURRENT_TIMESTAMP where transaction_details_id = "+transaction_details_id,[req.body.transaction_type_id,req.body.car_id, req.body.investor_id, req.body.transaction_type_mode, req.body.description, req.body.date, req.body.expense_id, req.body.credit, req.body.debit, req.body.balance ], function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result);
      });
      // client.end(); // closing the connection;
    });

    //Deleteapi/transactionDetails/deleteProfitOrLoss
    router.delete("/api/transactionDetails/deleteProfitOrLoss/:id", function(req, res) {
      var car_id = parseInt(req.params.id);
      var profit = 0;
      var loss = 0;
      var transaction_type_id=0;
      client.query('BEGIN', (err) => {
        if (shouldAbort(err)) return
        //Get sum of debits and credits
        client.query("SELECT coalesce(SUM(DEBIT),0) AS DEBIT_SUM, coalesce(SUM(CREDIT),0) AS CREDIT_SUM FROM TRANSACTION_DETAILS WHERE transaction_type_id in (3,4) and car_id = " + car_id, function(err,result) {
          if(err) {
            console.log("Error ",err);
          }
          else{
            loss = result.rows[0].debit_sum;
            profit = result.rows[0].credit_sum;
          }
        });

        //Delete Transaction Details with records for profit and loss
        client.query("delete from public.transaction_details where transaction_type_id in (3,4) and car_id = " + car_id + " returning *",
        function(err,result) {
          if(result) {
            if(result.rows.length > 0){ //Records Exist

              transaction_type_id = result.rows[0].transaction_type_id;
              car_id = result.rows[0].car_id;

              //Update Available Balance for Investors
              if(transaction_type_id == 3){//Profit
                //Loop through investors expense and percent
                req.body.forEach((investor) => {
                  const profitAmount = (investor.investors_percent/100) * profit;
                  //Update Available Balance
                  client.query("UPDATE CLIENT set available_balance = available_balance - "+ profitAmount +
                  " where client_id = "+investor.investor_id, (err, res) => {
                    if (shouldAbort(err)) return
                  });
                });//End of foreach
                client.query("UPDATE CAR set is_sold = false where car_id = "+car_id, (err, result) => {
                  if (shouldAbort(err)) return
                });
                client.query('COMMIT', (err) => {
                  if (err) {
                    console.error('Error committing transaction', err.stack)
                  }
                  // done();
                });
              }
              else if(transaction_type_id == 4){//Loss
                //Loop through investors expense and percent
                req.body.forEach((investor) => {
                  const lossAmount = (investor.investors_percent/100) * loss;
                  //Update Available Balance
                  client.query("UPDATE CLIENT set available_balance = available_balance - "+ lossAmount +
                  " where client_id = "+investor.investor_id, (err, res) => {
                    if (shouldAbort(err)) return
                  });

                });//End of foreach
                client.query("UPDATE CAR set is_sold = false where car_id = "+car_id, (err, result) => {
                  if (shouldAbort(err)) return
                });
                client.query('COMMIT', (err) => {
                  if (err) {
                    console.error('Error committing transaction', err.stack)
                  }
                  // done();
                });
              }
            }
            else{
              //Create New Transaction Detail and Update Available BALANCE
              //Either here or in the component call a new createP&LTransacDetail
              console.log("There are no Profit and Loss Transaction Details. Please create new records.");
            }
            res.status(200).send(result.rows);
          }
          else {
            console.log("Delete P&L ", err);
            if (shouldAbort(err)) return //Abort for delete tran details
          }
        });
      });//End Begin
    });
    router.delete("/api/transactionDetails/:id", function(req, res) {
      var transaction_details_id = parseInt(req.params.id);
      client.query('delete from public.transaction_details where transaction_details_id = '+transaction_details_id, function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
      // client.end(); // closing the connection;
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
