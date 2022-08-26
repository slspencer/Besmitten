// === Install express and helpers
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// === init express app
console.log("server.js - Init Express");
const app = express(); // create an express application
var PORT = process.env.PORT || 3001; // listen on 3001, heroku listens on 80 by default

// === define middleware to work with routes
console.log("server.js - setup middleware");
app.use(express.urlencoded( { extended: true } )); // middleware to parse incoming POST requests with URLencoded payloads
app.use(express.json()); // middleware to jsonify data
app.use(express.static('public'));// serve static html files in 'public' directory

// === define routes =======
console.log("server.js - define routes");
// route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route for notes page
app.get('/feedback', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
require('./routes/apiRoutes.js')(app); // manage api routes in a separate file, return exported objects in app
require('./routes/htmlRoutes.js')(app); // manage html routes in a separate file, return exported objects in app

// start server on port
console.log("server.js - listen on port");
app.listen(PORT, function() {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
});





