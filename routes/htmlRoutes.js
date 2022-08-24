// === variables and constants ================
var path = require("path");
var router = require("express").Router();

// === functions ==============================

// define the html route to the notes.html file as "/notes"
router.get("/notes", function(req, res) {
    // send the file to notes.html
    res.sendFile(path.join(__dirname, "../public/notes.html")); // 
});

// re-route all other routes to the index.html file
router.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;