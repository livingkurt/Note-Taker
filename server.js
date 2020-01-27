// // =============================================================
// // Dependencies
// // =============================================================
// var express = require("express");
// var path = require("path");
// var fs = require("fs");
// // var db = require("db/db.json");

// // =============================================================
// // Sets up the Express App
// // =============================================================
// var app = express();
// var PORT = process.env.PORT || 3000;

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'))

// // Routes
// // =============================================================

// // ===========================================================
// // HTML Routes
// // ===========================================================

// // Basic route that sends the user first to the AJAX Page
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/html/index.html"));
// });

// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/html/notes.html"));
// });

// // ===========================================================
// // API Routes
// // ===========================================================

// app.get("/api/notes", function (req, res) {
//     fs.readFile(__dirname + `/db/db.json`, function (err, data) {
//         if (err) throw err;
//         const new_data = JSON.parse(data);
//         res.json(new_data);
//         res.end(new_data);
//     })
// });



// // Create New Characters - takes in JSON input
// app.post("/api/notes", function (req, res) {
//     var new_note = req.body;
//     fs.readFile(__dirname + '/db/db.json', function (err, data) {

//         const json = JSON.parse(data)
//         const data_len = json.length + 1
//         new_note.id = data_len;

//         print(json)
//         json.push(new_note)
//         fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), function (err, data) {
//             if (err) throw err;
//         })
//     });
// });


// // Displays a single character, or returns false
// app.delete("/api/notes/:id", function (req, res) {
//     let chosen_id = req.params.id;

//     print(chosen_id);
//     fs.readFile(__dirname + '/db/db.json', function (err, data) {

//         const json = JSON.parse(data)
//         // const data_len = json.length
//         // print(data_len)
//         // new_note.id = data_len;
//         chosen_id = chosen_id - 1
//         json.splice(chosen_id);
//         print(json)
//         // json.push(new_note)
//         fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), function (err, data) {
//             if (err) throw err;
//         })
//     });
// });


// // Starts the server to begin listening
// // =============================================================
// app.listen(PORT, function () {
//     console.log("App listening on PORT " + PORT);
// });


// const print = x => console.log(x);


//requiring npms and other files needed for this application
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

let data_path = path.join(__dirname, '/db/db.json');


//adopting express and PORT
var app = express();
var PORT = process.env.PORT || 3000;

//linking public folder to attain data inside for this application
app.use(express.static('public'));

//setting up application parsing for my JSON files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Getting local host to load my index.html first
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public//html/index.html'));
});

//Getting local host to send my notes.html file when called
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/notes.html'));
});

//Getting my API/Notes
app.get('/api/notes', function (req, res) {
    res.json(db);
});

let id = 0;
// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
    // Assign the new note data to a variable
    const new_note = req.body;
    print(new_note)
    for (let i = 0; i < db.length; i++) {
        let note = db[i];
        print(note)
        print(note.id = i + 1)
    }
    if (db.length === 0) {
        id = 1;
        print(new_note.id = id)
    }
    else if (db.length > 0) {
        id = db.length;
        print(new_note.id = id + 1)
    }
    db.push(new_note)
    print(db)

    fs.writeFileSync(data_path, JSON.stringify(db), function (err, data) {
        if (err) throw err;
    })
    res.json(new_note);
});

// Displays a single character, or returns false
app.delete("/api/notes/:id", function (req, res) {
    let chosen_id = req.params.id;

    for (let i = 0; i < db.length; i++) {
        if (db[i].id == chosen_id){
            db.splice(i, 1);
            break;
        }
           
    } 
    print(chosen_id);
    fs.writeFileSync(data_path, JSON.stringify(db), function (err, data) {
        if (err) throw err;
    })
    res.json(db);
});



//listening to the Port so it will function like a live site
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

const print = x => console.log(x);