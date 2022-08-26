// === variables and constants ================
const path = require("path");
const express = require("express");    
var serveIndex = require('serve-index');

// === functions ==============================

module.exports = (app) => {

    // list files in current directory as troubleshooting measure
    app.use(express.static(__dirname + "/"))
    app.use('/videos', serveIndex(__dirname + '/videos'));

    // initial page load "/" serves index.html
    app.get("/", (req, res) => {
        console.log("HTML Route to ./public/index.html")
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    // route to display the notes.html file
    app.get("/notes", (req, res) => {
        console.log("HTML Route to ./public/notes.html");

        res.sendFile(path.join(__dirname,'./public/notes.html'));
        //res.sendFile(path.join(__dirname, "notes.html")); // returns notes.html
    });

    // all other routes return index.html
    app.get("*", (req, res) => {
        console.log("HTML Route for everything else, returns index.html");
        res.sendFile(path.join(__dirname, "./public/index.html")); // returns index.html
    });
}

