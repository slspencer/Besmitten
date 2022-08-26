// === variables and constants ================
const path = require("path");

// === functions ==============================

module.exports = (app) => {

    app.get("/", (req, res) => {
        console.log("HTML route to the home page");
        res.send(path.join(__dirname, "index.html"));
    });

    // route to display the notes.html file
    app.get("/notes", (req, res) => {
        console.log("HTML Route to public/notes.html");
        res.send('notes.html');
        //res.sendFile(path.join(__dirname, "notes.html")); // returns notes.html
    });

    // all other routes return index.html
    app.get("*", (req,res) => {
        console.log("getting route to index.html");
        res.sendFile(path.join(__dirname, "index.html")); // returns index.html
    });

}

