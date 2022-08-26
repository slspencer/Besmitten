// html route module
// notes are dynamically written to notes.html

// === variables and constants ================
const router = require("express").Router();
const path = require("path");

// === functions ==============================

// html route to notes.html is "/notes"
router.get("public/notes", function(req, res) {
    console.log("Getting HTML Route to public/notes.html");
    res.sendFile(path.join(__dirname, "/../public/notes.html")); // returns notes.html
});

// all other routes return index.html
router.get("*", function(req,res) {
    console.log("getting route to index.html");
    res.sendFile(path.join(__dirname, "/../public/index.html"));
});

module.exports = router;