// api route module
// notes are stored to db/db.json

// === variables and constants ==========================

const path = require('path');
const fs = require('fs');
let uniqid = require('uniqid'); 

// === functions =======================================

// POST a note 

module.exports = (app) =>

    app.post("/api/notes", (req, res) => {

        console.log("POST a note");

        // get jsonified notes from database into a local var db
        let noteDB = JSON.parse(fs.readFileSync('db/db.json'));
        res.json(noteDB);

        // create the JSON note object to be posted
        let postNote = {
            title: req.body.title,
            text:  req.body.text,
            id: uniqid()
        };

        // add the note object to the local var db
        noteDB.push(postNote);

        // sync local var db back to ./db/db.json
        fs.writeFileSync('../db/db.json', JSON.stringify(noteDB)); // user relative path with file operations
        res.json(noteDB); // jsonify the result
    });

    // Delete a note based on id
    app.delete("api/notes/:id", (req, res) => {

        console.log("DELETE a note");

        // get jsonified notes from database into a local var db
        let db = JSON.parse(fs.readFileSync('db/db.json')); 
        // get all notes that don't have the id into local var keepNotes
        let keepNotes = db.filter(item=> item.id !== req.params.id);
        // sync local var keepNotes to ./db/db.json
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(keepNotes); // jsonify the results 
    });

    // Get all notes from .db/db.json, return them jsonified
    app.get("/api/notes", (req, res) => {

        console.log("GET all notes");

        // set result to 
        res.sendFile(path.join(__dirname, '../db/db.json')); // use relative path with file operationss
    });


