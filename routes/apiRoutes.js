// notes are stored in the notes.html file in Besmitten/public/assets
// notes are saved to db.json in the db directory

// === variables and constants ==========================
const router = require("express").Router();
const store = require("../db/store.js");

// Save a note 
router.post("/notes", (req, res) => {
    console.log("POST a note");
    store   
        .addNote(req.body) // add note to the request
        .then( note => res.json(note) ) // jsonify the results
        .catch( err => res.status(500).json(err)); // display error 500 if any errors
});

// Delete a note 
router.delete("/notes/:id", (req, res) => {
    console.log("DELETE a note");
    store
        .deleteNote(req.body) // delete note from the store
        .then( console.log('We will delete a note here'))
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

