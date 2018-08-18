const { Client } = require('pg');
const express = require('express');
const router = express.Router();
 var env = require('dotenv').config();


 //Get environment variable
 // and seet connection string.
 //Works only if it is hard urlencoded

// var env = process.env.NODE_ENV || 'development';
// const environment '.src/environments/environment';

// const environment = require('./environment');

const app = express();


function connect(){
  var client = new Client({
    connectionString: 'postgres://bltypmsejfdisv:e88eb86f18914916049a49313bb5c7a8044cd50c229e0b55671ace8e4565f4ea@ec2-174-129-236-147.compute-1.amazonaws.com:5432/d2m86fr3a5nu60',
//connectionString:process.env.DATABASE_URL,
     ssl: true
  });


client.connect(function(err,client,done) {
  if(err){
    console.log("Failed to connect to the database "+ err);
  }
  else {
        // console.log("Connecteding "+ client1.host);
  }

});

return client;
}

module.exports = connect();
