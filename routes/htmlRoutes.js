// === variables and constants ================
const path = require("path");

// === functions ==============================

module.exports = (app) => {

    app.use(express.static(path.join(__dirname, 'public')));

    // route to display the notes.html file
    app.get("/notes.html", (req, res) => {
        console.log("HTML Route to public/notes.html");

        res.send(__dirname + '/public' + 'notes.html');
        //res.sendFile(path.join(__dirname, "notes.html")); // returns notes.html
    });

    // all other routes return index.html
    app.get("*", (req, res) => {
        console.log("getting route to index.html");
        res.sendFile(__dirname + '/public' + 'index.html')); // returns index.html
    });

}

