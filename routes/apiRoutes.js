// notes are stored in the notes.html file in Besmitten/public/assets

const router = require("express").Router();

// notes are saved to db.json in the db directory
const store = require("../db/db.json");

// notes are written to notes.html in the public directory
const notesHTML = "./../public/notes.html";

// POST a note 
router.post(notesHTML, (req, res) => {
    console.log("POST a note");
    store   
        .postNote(req.body) // add note to the request
        .then( note => res.json(note) ) // jsonify the results
        .catch( err => res.status(500).json(err)); // display error 500 if any errors
});

// DELETE a note 
router.delete(notesHTML, (req, res) => {
    console.log("DELETE a note");
    store
        .deleteNote(req.body) // delete note from the store
        .then( console.log('We will delete a note here'))
        .catch( err => res.status(500).json(err)); // display error 500 if any errors
})

// GET all notes
router.get(notes, (req, res) => {
    console.log("GET all notes");
    store
        .getNotes() // get all the notes, no need for a parameter
        .then( notes => res.json(notes)) // jsonify the results
        .catch(err => res.status(500).json(err))  // display error 500 if any errors
});

// make router available to other scripts
module.exports = router;

