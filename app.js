
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const port = process.env.PORT || '3000';

const app = express();
const makesAPI = require('./src/api/routes/makes');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors(corsOptions));
app.use(makesAPI);
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.set('port',port);

// Initialize the app.
const server = http.createServer(app);
server.listen(port, () => console.log("App is listening on Port : ",port));

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
