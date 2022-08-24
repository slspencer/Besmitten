// notes are stored in the notes.html file in Besmitten/public/assets

const router = require("express").Router();
const store = require("../db/store");

// notes are stored in notes.html in the public directory
const notes = "./../public/notes.html";

// POST a note to notes.html
router.post(notes, (req, res) => {
    console.log("POST a note")
    store   
        .postNote(req.body) // add note to the request
        .then( (note) => res.json(note) ) // jsonify the results
        .catch( err => res.status(500).json(err)); // display any errors
});

// DELETE a note
router.delete(notes, (req, res) => {
    console.log("DELETE a note");
})

// GET all the the notes from notes.html
router.get(notes, (req, res) => {
    console.log("GET all notes");
});



// make router available to other scripts
module.exports = router;

