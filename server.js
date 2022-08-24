// Install express
const express = require('express');
const app = express();

// Install fs & path to read files
const fs = require('fs');
const path = require('path');

// listen on port 3306 (heroku)
const PORT = process.env.PORT || 3306;

// create routers
const apiRoutes = require('./routes/apiRoutes');
const htmlROutes = require('.routes/htmlRoutes');

// define middleware with express
app.use(express.urlencoded( { extended: true } ));

// set up directory for static files & assets
app.use(express.static('public'));
// ??
app.use(expresss.json());

// connect application to express routes
app.use('/api', apiRoutes);
app.use('/', json());

// listen to connections on host & port
app.listen(PORT, () => {
    console.log(`Note taking app listening at http://localhost:${port}`);
});





