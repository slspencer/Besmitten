// Install express, apiRoutes, and htmlRoutes
const express = require('express');
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");

// Install fs & path to read files
const fs = require('fs');
const path = require('path');

// Init the express app
const app = express();

// listen on port 3306 (heroku)
const PORT = process.env.PORT || 3306;

// setup middleware
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

// set up directory for static files & assets
app.use(express.static('public'));

// connect application to express routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start server on port
app.listen(PORT, () => {
    console.log(`Note taking app listening at http://localhost:${port}`);
});





