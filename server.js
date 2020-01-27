// Calling Dependencies

// Calling Express to create server
const express = require('express');
// Calling fs to manipulate the file system
const fs = require('fs');
// Calling path to manipulate file paths
const path = require('path');
// Calling the db.json file to save and delete notes from
const db = require('./db/db.json');


// Assign db.json file path to a variable
let data_path = path.join(__dirname, '/db/db.json');
// Initializing id for new notes being created
let id = 0;


// Sets up the Express App
var app = express();
// Assign Server a port of 3000 unless given a port from the deployer
var PORT = process.env.PORT || 3000;

// Allows the server to look into the public folder without needing to provide the full relative path 
app.use(express.static('public'));

// Middleware is called between processing the request and sending the Response in your server

// Allows the establishing of post requests to json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get request to host the index.html
app.get('/', function (req, res) {
    // Specifiy which html file you want to host on your server when there is just a / in the url
    res.sendFile(path.join(__dirname, '/public//html/index.html'));
    // Print Status of app
    print("\n<<<Opening index.html>>>")
});

// Get request to host the notes.html
app.get('/notes', function (req, res) {
    // Specifiy which html file you want to host on your server when there is /notes in the url
    res.sendFile(path.join(__dirname, '/public/html/notes.html'));
    // Print Status of app
    print("\n<<<Opening notes.html>>>")
});

// Get request for date from db.json
app.get('/api/notes', function (req, res) {
    // Is like send where it automatically sets the content type based on what file it is but adds more json functionality that isn't avaible to res.send()
    res.json(db);
});


// Creates new note, adds an id, and rewrites the db.json file
app.post("/api/notes", function (req, res) {
    // Assign the new note data to a variable
    const new_note = req.body;
    // Loop through your array of notes in your db.json
    for (let i = 0; i < db.length; i++) {
        // Assign each note to a variable
        let note = db[i];
        // Assign all of the notes a incrimented id starting at 1
        note.id = i + 1
    }
    // If there is no notes saved
    if (db.length === 0) {
        // Assign 1 to id variable
        id = 1;
        // Assign that id to the first note
        new_note.id = id
    }
    // If there is notes saved
    else if (db.length > 0) {
        // Assign the length of the array to the id variable
        id = db.length;
        // Add 1 to id
        id++
        // Assign that id to the newest note created
        new_note.id = id
    }
    // Print Status of app
    print(`\n<<<Saving Note id ${id} to Server>>>`)
    // Add new note to the array in db.json
    db.push(new_note)
    // After Changes have been made, rewrite the db.json file with new changes
    write_to_db_json(res)
});

// Deletes a specific note based on id
app.delete("/api/notes/:id", function (req, res) {
    // Assigns id that was chosen by user to variable
    let chosen_id = req.params.id;
    // Loop through your array of notes in your db.json
    for (let i = 0; i < db.length; i++) {
        // Assign each note to a variable
        let note = db[i]
        // If the that is calling to be deleted matches an id that is inside of the db.json
        if (note.id == chosen_id){
            // Remove that object from the array
            db.splice(i, 1);
            // Print Status of app
            print(`\n<<<Deleting Note id ${chosen_id} from Server>>>`)
        }
    } 
    
    // After Changes have been made, rewrite the db.json file with new changes
    write_to_db_json(res)
});

// After Changes have been made, rewrite the db.json file with new changes
function write_to_db_json(res) {
    // Rewrite all note data to json file
    fs.writeFileSync(data_path, JSON.stringify(db), function (err, data) {
        if (err) throw err;
    })
    // Is like send where it automatically sets the content type based on what file it is but adds more json functionality that isn't avaible to res.send()
    res.json(db);
    // Print Status of app
    print("\n<<<Updating db.json>>>\n")

}

//listening to the Port so it will function like a live site
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

const print = x => console.log(x);