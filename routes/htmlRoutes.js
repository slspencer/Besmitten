// === variables and constants ================
var path = require("path");
var router = require("express").Router();

// === functions ==============================

// html route to notes.html file is "/notes"
router.get("/notes", function(req, res) {
    // send the file to notes.html
    res.sendFile(path.join(__dirname, "../public/notes.html")); // 
});

// all other routes are re-directed to index.html
router.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;