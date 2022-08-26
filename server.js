// Install express, apiRoutes, and htmlRoutes
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const db = require("./db/db.json");
const dbPath = "./db/db.json";

// init express app
const app = express(); // create an express application
var PORT = process.env.PORT || 3001; // listen on 3001, heroku listens on 80 by default
let readDbFile = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// middleware to work with routes
app.use("/public", express.static('/public'));// serve static html files in 'public' directory
app.use(express.urlencoded( { extended: true } )); // middleware to parse incoming POST requests with URLencoded payloads
app.use(express.json()); // middleware to jsonify data

// define routes
require('./routes/apiRoutes')(app); // manage api routes in a separate file, return exported objects in app
require('./routes/htmlRoutes')(app); // manage html routes in a separate file, return exported objects in app

// start server on port
app.listen(PORT, function() {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
});





