const { Client } = require('pg');
const express = require('express');
const router = express.Router();
 // var env = require('dotenv').config();


 //Get environment variable
 // and seet connection string.
 //Works only if it is hard urlencoded

// var env = process.env.NODE_ENV || 'development';
// const environment '.src/environments/environment';

// const environment = require('./environment');

const app = express();


function connect(){
  var client = new Client({
    //heroku config --app gear2gear gives connectionString
    connectionString: 'postgres://qoqgsadljgzsgr:dbc104b647622f5e7460c72e7dc31a0b23b94ece8614c864b104b15dc44f2b9d@ec2-50-17-194-129.compute-1.amazonaws.com:5432/dalp1drkjndrse',
     // connectionString:'postgres://localhost:5432/postgres',
     ssl: true
  });


client.connect(function(err,client,done) {
  if(err){
    console.log("Failed to connect to the database "+ err);
  }
  else {
        console.log("Connecteding "+ app.get('env'));
  }

});

return client;
}

module.exports = connect();
