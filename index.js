// Use the dotenv package, to create environment variables

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000

// Import express, and create a server

// Require morgan and body-parser middleware

// Have the server use morgan with setting 'dev'

// Import cors 
// Have the server use cors()

// Have the server use bodyParser.json()

// Have the server use your api router with prefix '/api'

// Import the client from your db/index.js

// Create custom 404 handler that sets the status code to 404.

// Create custom error handling that sets the status code to 500
// and returns the error as an object


// Start the server listening on port PORT
// On success, connect to the database
require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
server.use(express.json())

const morgan = require('morgan');
const { application_name } = require('pg/lib/defaults');
server.use(morgan('dev'));


// Import cors 
// Have the server use cors()
const cors = require('cors');
server.use(cors());

// Have the server use bodyParser.json()
const bodyParser = require('body-parser')

server.use(bodyParser.json());
// Have the server use your api router with prefix '/api'
const apiRouter = require('./api');
server.use('/api', apiRouter);
// Import the client from your db/index.js
const { client } = require("./db");
// Create custom 404 handler that sets the status code to 404.
server.use( (req, res, next)=> {
    res.status(404).send("Status set to 404")
  })
// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((req, res, next)=> {
   try{
       res.status(500).send("Status set to 500")
   } catch (error){
       return {message: "Trouble setting status to 500"}
   }
})
  client.connect();
  server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });
