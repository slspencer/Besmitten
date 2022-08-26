// Install express, apiRoutes, and htmlRoutes
const express = require('express');

// Init the express app
const app = express();

// define the app's port as 3001 (heroku listens on 80 by default)
const PORT = process.env.PORT || 3001;

// set up a route to public files
app.use(express.static('public')); // gives a '/' route

// setup middleware to parse data, jsonify 
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());

// create routes to route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// start server on port
app.listen(PORT, () => {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
});





