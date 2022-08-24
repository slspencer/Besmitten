// === variables and constants ===================
const util = require("util");
const fs = require("fs");
const db = require("./db.json");
const uuid = require('uuid'); // generate ids
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const dbFile = "db/db.json"; // include directory name to enable finding db.json
const encoding = "utf8"; 

// ==== classes ==================================

class Store {
    // get all notes
    read() {
        return readFile(dbFile, encoding); // utf8 encoding
    } // end read()

    // write one note
    write(note) {
        return writeFile(dbFile, JSON.stringify(note)); //jsonify the note
    } // end write()

    // add a note, called in apiRoutes.js
    addNote(note) {
        // each note has a title and text
        let {title, text} = note;
        // test if either title or text is missing
        if (!title || !text) { throw new Error("Title or text can't be blank"); }
        //create the note
        let nextNote = { title, text, id: uuid()} // use uuid defined in apiRoutes.js
        // return the nextNote (first get all notes, append the nextNote, & re-write the notes)
        return this.getNotes()
            .then((oldNotes) => [...oldNotes, nextNote]) // append nextNote to end of oldNotes
            .then((newNotes) => this.write(newNotes)) // rewrite the new Notes to Store
            .then(() => nextNote); // return the nextNote
    } // end addNote()

    // delete a node with a given id, called in apiRoutes.js
    deleteNote(id) {
        // 
    }

    // return all the notes in an array, called in apiRoutes.js
    getNotes() {
        return this.read().then((notes) => {
            let arrNotes = [];
            try {
                let jsonNotes = JSON.parse(notes);
            } catch (err) {
                return arrNotes; // return empty array if couldn't get the notes
            }
            return arrNotes.concat(jsonNotes); // return jsonified notes in an array
        });
    } // end getNotes()

}
