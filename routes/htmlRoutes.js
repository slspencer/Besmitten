// === variables and constants ================
const path = require("path");
const express = require("express");    
var serveIndex = require('serve-index');

// === functions ==============================

module.exports = (app) => {

    // list files in current directory as troubleshooting measure
    //app.use(express.static(__dirname + "/"))
   //app.use('/', serveIndex(__dirname + '/');

    // initial page load "/" serves index.html
    app.get("/", (req, res) => {
        console.log("HTML Route to ../public/index.html");
        console.log(`__dirname = ${__dirname}`); // __dirname in this file is '/app/routes
        var indexPath = path.join(__dirname, '..', 'public', 'index.html');
        console.log(`indexPath = ${indexPath}`); 
        res.sendFile(indexPath);
    });

    // route to display the notes.html file
    app.get("/notes", (req, res) => {
        console.log("HTML Route to ../public/notes.html");
        var notesPath = path.join(__dirname, '..', 'public', 'notes.html');
        console.log(`notesPath = ${notesPath}`); 
        res.sendFile(notesPath);
        //res.sendFile(path.join(__dirname, "notes.html")); // returns notes.html
    });

    // all other routes return index.html
    app.get("*", (req, res) => {
        console.log("HTML Route for everything else, returns ../public/index.html");
        var defaultPath = path.join(__dirname, '..', 'public', 'index.html');
        console.log(`defaultPath = ${defaultPath}`);         
        res.sendFile(defaultPath); // returns index.html
    });
}

