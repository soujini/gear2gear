var client = require('./connection');
const express = require('express');
const http = require('http');
const router = express.Router();

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
router.get('/api/transactionDetails/investor/:id', function(req, res) {
  var investor_id = parseInt(req.params.id);
  client.query('SELECT * from public.transaction_details td where td.investor_id = '+investor_id +' order by date desc',
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
router.get('/api/transactionDetails/investorsInvestmentDetails/:date', function(req, res) {
  var purchase_date = "'"+req.params.date.toString()+"'";
  client.query(
    'with table1 as ('+
    ' SELECT td.investor_id , c.is_investor,'+
    ' coalesce(SUM(td.credit),0) as investor_investment,'+
    ' coalesce(SUM(td.debit),0) as investor_withdrawal,'+
    ' coalesce(SUM(td.credit),0) - coalesce(SUM(td.debit),0) as investor_balance,'+
    ' (select coalesce(SUM(credit),0) - coalesce(SUM(debit),0) from transaction_details'+
     ' where investor_id is not null'+
     ' AND date <='+purchase_date+
     ' AND transaction_type_id in(1,3,4,11)'+
     ' AND is_void is not true'+
    ' ) as total_company_investment'+

    ' FROM transaction_details td, client c'+
    ' WHERE td.investor_id is not null'+
    ' AND td.is_void is not true'+
    ' AND date <= '+purchase_date+
    ' AND c.is_investor=true'+
    ' AND td.investor_id=c.client_id'+
    ' GROUP BY td.investor_id, c.is_investor )'+
    ' select investor_id, investor_investment, investor_withdrawal, investor_balance, total_company_investment,'+
    ' round((cast(investor_balance as decimal) / cast(total_company_investment as decimal) * 100),5) as investor_percent'+
    ' from table1',
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

  router.get('/api/transactionDetails', function(req, res) {
    client.query(
      '	SELECT CR.MAKE_YEAR, MK.NAME AS MAKE_NAME, MD.NAME AS MODEL_NAME, V.NAME AS VARIANT_NAME,  TD.*, C.NAME AS INVESTOR_NAME, TT.NAME AS TRANSACTION_TYPE_NAME, E.NAME AS EXPENSE_NAME'+
      ' FROM PUBLIC.TRANSACTION_DETAILS TD'+
      ' LEFT JOIN PUBLIC.CLIENT C ON TD.INVESTOR_ID = C.CLIENT_ID'+
      ' LEFT JOIN PUBLIC.TRANSACTION_TYPE TT ON TD.TRANSACTION_TYPE_ID = TT.TRANSACTION_TYPE_ID'+
      ' LEFT JOIN PUBLIC.EXPENSES E ON TD.EXPENSE_ID = E.EXPENSE_ID'+
      ' LEFT JOIN PUBLIC.CAR CR ON TD.CAR_ID = CR.CAR_ID'+
      ' LEFT JOIN PUBLIC.MAKE MK ON CR.MAKE = MK.MAKE_ID'+
      ' LEFT JOIN PUBLIC.MODEL MD ON CR.MODEL = MD.MODEL_ID'+
      ' LEFT JOIN PUBLIC.VARIANT V ON CR.VARIANT = V.VARIANT_ID'+
      ' ORDER BY DATE DESC' ,
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

    router.get('/api/transactionDetails/availablePoolBalance/:date', function(req, res) {
      var purchase_date = req.params.date;
      client.query(
        "select coalesce(sum(credit),0) - coalesce(sum(debit),0) as available_balance, coalesce(sum(debit),0) as total_debits, coalesce(sum(credit),0) as total_credits from public.transaction_details where (is_void=false or is_void is null) and date::timestamp::date <= '"+purchase_date+"'",
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

    router.get('/api/transactionDetails/search/:searchTerm', function(req, res) {
      const searchTerm  = req.params.searchTerm.toLowerCase();
      client.query("SELECT * from public.transaction_details where Lower(name) like $1",['%' + searchTerm + '%'], function(err,result) {
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        else{
          res.status(200).send(result.rows);
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
        'AND A.IS_VOID is not true '+
        'GROUP BY A.CAR_ID, B.CAR_ID ',
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

      router.post("/api/transactionDetails/profitAndLoss", function(req, res) {
        client.query('BEGIN', (err) => {
          req.body.forEach((investor) => {
            if (shouldAbort(err)) return

            var sql = "INSERT INTO public.transaction_details (transaction_details_id, transaction_type_id, investor_id, transaction_type_mode, description, date, credit,debit, car_id, expense_id, percentage, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7,$8,$9,$10, 1, CURRENT_TIMESTAMP) returning transaction_details_id";
            var values = [investor.transaction_type_id, investor.investor_id, investor.transaction_type_mode, investor.description, investor.date, investor.credit, investor.debit, investor.car_id, investor.expense_id, investor.percentage];
            client.query(sql, values, function(err,result) {
              if(err){
                console.log("ERROR : ", err);
                if(shouldAbort(err)) return;
              }
              else{
                //Update Car is_sold=true
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
            });//End of INSERT
          });//End of foreach
        });//End of Begin
      });

      router.post("/api/transactionDetails/client", function(req, res) {
        if(req.body.credit){
          req.body.credit = req.body.credit.replace( /,/g, "" );
        }
        if(req.body.debit){
          req.body.debit = req.body.debit.replace( /,/g, "" );
        }

        client.query("INSERT INTO public.transaction_details (transaction_details_id, transaction_type_id, investor_id, transaction_type_mode, description, date, credit,debit, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, 1, CURRENT_TIMESTAMP) returning transaction_details_id",
        [req.body.transaction_type_id, req.body.investor_id, req.body.transaction_type_mode, req.body.description, req.body.date, req.body.credit, req.body.debit], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send(result.rows[0]);
        });
      });

      router.post("/api/transactionDetails", function(req, res) {
        if(req.body.credit){
          req.body.credit = req.body.credit.replace( /,/g, "" );
        }
        if(req.body.debit){
          req.body.debit = req.body.debit.replace( /,/g, "" );
        }

        client.query("INSERT INTO public.transaction_details (transaction_details_id, transaction_type_id, investor_id, transaction_type_mode, description, date, credit,debit, car_id, expense_id, created_by, create_date) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7,$8,$9, 1, CURRENT_TIMESTAMP) returning transaction_details_id",
        [req.body.transaction_type_id, req.body.investor_id, req.body.transaction_type_mode, req.body.description, req.body.date, req.body.credit, req.body.debit, req.body.car_id, req.body.expense_id], function(err,result) {
          if(err){
            console.log(err);
            res.status(400).send(err);
          }
          else{
          res.status(200).send(result.rows[0]);
        }
        });
      });

      router.get("/api/transactionDetails/soldTranType/:id", function(req, res) {
        var car_id = parseInt(req.params.id);
        client.query(
          'select coalesce(sum(credit),0) as total_money_received from transaction_details where transaction_type_id=13 and (is_void=false or is_void is null) and car_id = '+car_id,
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
        router.get("/api/transactionDetails/purchaseTranType/:id", function(req, res) {
          var car_id = parseInt(req.params.id);
          client.query(
            'select coalesce(sum(debit),0) as total_money_invested from transaction_details where transaction_type_id=12 and (is_void=false or is_void is null) and car_id = '+car_id,
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

      router.get("/api/transactionDetails/:id", function(req, res) {
        var car_id = parseInt(req.params.id);
        client.query(
          'SELECT TD.*, E.NAME as EXPENSE_NAME, C.NAME as INVESTOR_NAME, TT.NAME AS TRANSACTION_NAME '+
          'FROM TRANSACTION_DETAILS TD '+
          'LEFT JOIN EXPENSES E ON TD.EXPENSE_ID = E.EXPENSE_ID '+
          'LEFT JOIN CLIENT C ON TD.INVESTOR_ID = C.CLIENT_ID '+
          'LEFT JOIN TRANSACTION_TYPE TT ON TD.TRANSACTION_TYPE_ID = TT.TRANSACTION_TYPE_ID '+
          'WHERE car_id = '+car_id,
          // 'group by td.transaction_details_id', E.name, c.name, tt.name,
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

              res.status(200).send(result.rows);
            }
          });
        });
        router.get("/api/transactionDetails/all/:id", function(req, res) {
          var car_id = parseInt(req.params.id);
          client.query(
            'SELECT TD.*, E.NAME as EXPENSE_NAME, C.NAME as INVESTOR_NAME, TT.NAME AS TRANSACTION_NAME '+
            'FROM TRANSACTION_DETAILS TD '+
            'LEFT JOIN EXPENSES E ON TD.EXPENSE_ID = E.EXPENSE_ID '+
            'LEFT JOIN CLIENT C ON TD.INVESTOR_ID = C.CLIENT_ID '+
            'LEFT JOIN TRANSACTION_TYPE TT ON TD.TRANSACTION_TYPE_ID = TT.TRANSACTION_TYPE_ID '+
            'where td.is_void is not true '+
            'and car_id = '+car_id,
            // 'group by td.transaction_details_id', E.name, c.name, tt.name,
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

                res.status(200).send(result.rows);
              }
            });
          });
        //Get available balance
        // router.get("/api/transactionDetails/balance/:id", function(req, res) {
        //
        //   var car_id = parseInt(req.params.id);
        //   client.query('select balance from public.transaction_details order by create_date desc limit 1 where car_id = '+car_id, function(err,result) {
        //     if(err){
        //       console.log(err);
        //       res.status(400).send(err);
        //     }
        //     else{
        //       res.status(200).send(result.rows);
        //     }
        //   });
        //
        // });
        router.put("/api/transactionDetails/:id", function(req, res) {
          var transaction_details_id = parseInt(req.params.id);
          client.query("update public.transaction_details set transaction_type_id = $1, car_id= $2, investor_id=$3, transaction_type_mode=$4, description=$5, date= $6, expense_id=$7, credit=$8, debit=$9, balance=$10,  updated_by=1, update_date=CURRENT_TIMESTAMP where transaction_details_id = "+transaction_details_id,[req.body.transaction_type_id,req.body.car_id, req.body.investor_id, req.body.transaction_type_mode, req.body.description, req.body.date, req.body.expense_id, req.body.credit, req.body.debit, req.body.balance ], function(err,result) {
            if(err){
              console.log(err);
              res.status(400).send(err);
            }
            else{
            res.status(200).send(result);
          }
          });

        });
        router.put("/api/transactionDetails/void/:id", function(req, res) {
          var transaction_details_id = parseInt(req.params.id);
          client.query("update public.transaction_details set is_void = true, updated_by=1, update_date=CURRENT_TIMESTAMP where transaction_details_id = "+transaction_details_id, function(err,result) {
            if(err){
              console.log(err);
              res.status(400).send(err);
            }
            else{
            res.status(200).send(result);
          }
          });

        });

        //Deleteapi/transactionDetails/deleteProfitOrLoss
        router.delete("/api/transactionDetails/deleteProfitOrLoss/:id", function(req, res) {
          var car_id = parseInt(req.params.id);
          client.query('BEGIN', (err) => {
              if (shouldAbort(err)) return

              client.query("delete from public.transaction_details where transaction_type_id in (3,4,13) and car_id = " + car_id + " returning *", function(err,result) {
                if(err){
                  console.log("ERROR : ", err);
                  if(shouldAbort(err)) return;
                }
                else{
                  //Update Car is_sold=false
                  client.query("UPDATE CAR set is_sold = false where car_id = "+car_id, (err, result) => {
                    if (shouldAbort(err)) return
                  });

                  client.query('COMMIT', (err) => {
                    if (err) {
                      console.error('Error committing transaction', err.stack)
                    }
                  });//End of commit
                  res.status(200).send(res.rows);
                }
              });//End of INSERT
          });//End of Begin
        });

        router.delete("/api/transactionDetails/:id", function(req, res) {
          console.log("deleting");
          var transaction_details_id = parseInt(req.params.id);
            console.log(transaction_details_id);
          client.query('delete from public.transaction_details where transaction_details_id = '+transaction_details_id, function(err,result) {
            if(err){
              console.log(err);
              res.status(400).send(err);
            }
            else{
            res.status(200).send(result.rows);
          }
          });
        });
        router.delete("/api/transactionDetails/transactionType/:id", function(req, res) {
          var transaction_type_id = parseInt(req.params.id);
          client.query('delete from public.transaction_details where transaction_type_id = '+transaction_type_id, function(err,result) {
            if(err){
              console.log(err);
              res.status(400).send(err);
            }
            else{
            res.status(200).send(result.rows);
          }
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
