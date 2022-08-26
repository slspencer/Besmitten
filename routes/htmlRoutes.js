// === variables and constants ================
const path = require("path");

// === functions ==============================

module.exports = (app) => {

    // route to display the notes.html file
    app.get("/notes", function(req, res) {
        console.log("HTML Route to public/notes.html");
        res.sendFile(path.join(__dirname, "./../public/notes.html")); // returns notes.html
    });

    // all other routes return index.html
    app.get("*", function(req,res) {
        console.log("getting route to index.html");
        res.sendFile(path.join(__dirname, "./../public/index.html")); // returns index.html
    });

}

