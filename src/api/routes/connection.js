const { Client } = require('pg');
const express = require('express');
const router = express.Router();
let environment = require('../../environments/environment.ts');
//import environment from '../../environments/environment.ts';
const app = express();

function connect(){
  var client = new Client({
    connectionString:environment.CONNECTION_STRING,
    ssl: environment.SSL
  });


  client.connect(function(err,client,done) {
    if(err){
      console.log("Failed to connect to the database "+ err);
        console.log("Connecting "+ environment.CONNECTION_STRING);
    }
    else {
      console.log("Connecting "+ app.get('env'));
      console.log("Connecting "+ environment.ORIGIN);
    }

  });

  return client;
}

module.exports = connect();
