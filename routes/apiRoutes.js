// API route module for GET, POST, DELETE 
// notes are stored to db/db.json

// === variables and constants ==========================
const fs = require('fs');
const path = require('path');
let uuid = require('uuid'); 
const db = require("../db/db.json");

// === functions =======================================

// POST a note 

module.exports = (app) => {

    // GET from & Post to database
    app.route("/api/notes")
        .get(function (req, res) {
            console.log("GET the database");
            res.json(db); // return entire database
        })
        .post(function (req, res) {
            console.log("POST a note");
            // get jsonified notes from database into a local var db
            let dbPath = path.join(__dirname, "..", "db", "db.json");
            // create the JSON note object to be posted
            let newNote = {
                title: req.body.title,
                text:  req.body.text,
                id: uuid()
            };

            // add the note object to the local var db
            db.push(newNote);

            // sync local var db back to ./db/db.json
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

}
