// === Install express and helpers
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const db = require("./db/db.json");

// === init express app
console.log("server.js - Init Express");
const app = express(); // create an express application
var PORT = process.env.PORT || 3001; // listen on 3001, heroku listens on 80 by default

// === define middleware to work with routes
console.log("server.js - setup middleware");
app.use(express.urlencoded( { extended: true } )); // middleware to parse incoming POST requests with URLencoded payloads
app.use(express.json()); // middleware to jsonify data
app.use(express.static('public'));// serve static html files in 'public' directory

// === define HTML routes =======
console.log("server.js - define routes");
// HTML route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// HTML route for notes page
app.get('/feedback', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// === define API routes ===========
// GET from & Post to database
app.route("/api/notes")
    .get(function (req, res) {
        console.log("GET the database");
        res.json(db); // return entire database
    })
    .post(function (req, res) {
        console.log("POST a note");
        // create the JSON note object to be posted
        let newNote = {
            title: req.body.title,
            text:  req.body.text,
            id: uuid()
        };
        // add the note object to the local var db
        db.push(newNote);
        // sync local var db back to ./db/db.json
        let dbPath = path.join(__dirname, "db", "db.json");        
        fs.writeFileSync(dbPath, JSON.stringify(db), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("POST a note - posted")
        }); // use relative path with file operations
        res.json(newNote); // jsonify & return the new Note
    });

    // delete a note based on id
    app.delete("api/notes/:id", (req, res) => {
    console.log("DELETE a note");
    // get all notes that don't have the id into local var keepNotes
    let keepNotes = db.filter(item => item.id !== req.params.id);
    // sync local var keepNotes to ./db/db.json
    fs.writeFileSync(dbPath, JSON.stringify(keepNotes)), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("DELETE a note - deleted");
        }
    };
    res.json(keepNotes); // return jsonified results
});

//=== start app =============
// listen on port
console.log("server.js - listen on port");
app.listen(PORT, function() {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
});





