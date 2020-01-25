// =============================================================
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// var db = require("db/db.json");

// =============================================================
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Routes
// =============================================================

// ===========================================================
// HTML Routes
// ===========================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/notes.html"));
});

// ===========================================================
// API Routes
// ===========================================================

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + `/db/db.json`, function (err, data) {
        if (err) throw err;
        const new_data = JSON.parse(data);
        res.json(new_data);
        res.end(new_data);
    })
});



// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
    var new_note = req.body;
    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        
        const json = JSON.parse(data)
        const data_len = json.length + 1
        new_note.id = data_len;

        print(json)
        json.push(new_note)
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), function (err, data) {
            if (err) throw err;
        })
    });
});


// Displays a single character, or returns false
app.delete("/api/notes/:id", function (req, res) {
    let chosen_id = req.params.id;

    print(chosen_id);
    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        
        const json = JSON.parse(data)
        // const data_len = json.length
        // print(data_len)
        // new_note.id = data_len;
        chosen_id = chosen_id - 1
        json.splice(chosen_id);
        print(json)
        // json.push(new_note)
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), function (err, data) {
            if (err) throw err;
        })
    });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


const print = x => console.log(x);