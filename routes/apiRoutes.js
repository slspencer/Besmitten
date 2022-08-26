// api route module
// notes are stored to db/db.json

// === variables and constants ==========================
const fs = require('fs');
const path = require('path');
let uuid = require('uuid'); 

// === functions =======================================

// POST a note 

module.exports = (app) => {

    // post a note
    app.post("/api/notes", (req, res) => {
        console.log("POST a note");
        // get jsonified notes from database into a local var db
        let db = JSON.parse(fs.readFileSync('../db/db.json')); // use relative path with file operations
        res.json(db);

        // create the JSON note object to be posted
        let postNote = {
            title: req.body.title,
            text:  req.body.text,
            id: uniqid()
        };

        // add the note object to the local var db
        db.push(postNote);

        // sync local var db back to ./db/db.json
        fs.writeFileSync('../db/db.json', JSON.stringify(db)); // use relative path with file operations
        res.json(db); // jsonify & return the local var db
    });

    // get a note based on id
    app.get("api/notes/:id", (req, res) => {
        console.log("GET a note");
        // get jsonified notes from database into a local var db
        let db = JSON.parse(fs.readFileSync('../db/db.json')); // use relative path with file operations
        // get the note w/ id into local var notes
        let note = db.filter(item => item.id === req.params.id);
        res.json(note); // jsonify & return the note
    });

    // delete a note based on id
    app.delete("api/notes/:id", (req, res) => {
        console.log("DELETE a note");
        // get jsonified notes from database into a local var db
        let db = JSON.parse(fs.readFileSync('../db/db.json')); // use relative path with file operations
        // get all notes that don't have the id into local var keepNotes
        let keepNotes = db.filter(item => item.id !== req.params.id);
        // sync local var keepNotes to ./db/db.json
        fs.writeFileSync('../db/db.json', JSON.stringify(keepNotes));
        res.json(keepNotes); // jsonify & return the local var db (minus the note)
    });

    // Get all notes from .db/db.json, return them jsonified
    app.get("/api/notes", (req, res) => {
        console.log("GET all notes");
        // get the entire file
        res.sendFile(path.join(__dirname, '../db/db.json')); // use relative path with file operationss
    });

}
