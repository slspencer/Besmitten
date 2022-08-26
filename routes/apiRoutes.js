// notes are dynamically written to ./public/assets/notes.html
// notes are stored to ./db/db.json

// === variables and constants ==========================
const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');

const router = require("express").Router();
const store = require("../db/store.js");

// Save a note ("/notes" is the html route to notes.html)
router.post("/notes", (req, res) => {
    console.log("POST a note");
    store   
        .addNote(req.body) // add note to the request
        .then( note => res.json(note) ) // jsonify the results
        .catch( err => res.status(500).json(err)); // display error 500 if any errors
});

// Delete a note based on id
router.delete("/notes/:id", (req, res) => {
    console.log("DELETE a note");
    store
        .deleteNote(req.body) // delete note 
        .catch( err => res.status(500).json(err)); // display error 500 if any errors
})

// Get all notes
router.get("/notes", (req, res) => {
    console.log("GET all notes");
    store
        .getNotes() // getNotes() defined in store.js -- get all the notes, no need for a parameter
        .then( notes => res.json(notes)) // jsonify the results
        .catch(err => res.status(500).json(err))  // display error 500 if any errors
});

// make router available to other scripts
module.exports = router;

