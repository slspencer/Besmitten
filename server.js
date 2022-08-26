// Install express, apiRoutes, and htmlRoutes
const express = require('express');
const app = express(); // init express
const PORT = process.env.PORT || 3001; // listen on 3001, heroku listens on 80 by default

const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");

// middleware
app.use(express.static('public')); // gives a '/' route to public files
app.use(express.urlencoded( { extended: true } )); // middleware to parse data
app.use(express.json()); // middleware to jsonify data

// create routes to route files
//require('./routes/apiRoutes')(app); // apiRoute to db/db.jon
//require('./routes/htmlRoutes')(app); // htmlRoute to public/notes.html
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start server on port
app.listen(PORT, () => {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
});





