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
    // const data_base_json = fs.readFile("/db.json")
    // const data_base_parsed = JSON.parse(data_base);
    fs.readFile(__dirname + `/db/db.json`, function (err, data) {
        if (err) throw err;
        const new_data = JSON.parse(data);
        // Get title from database
        print(new_data[0].title)
        // Get text from database
        print(new_data[0].text)

        res.json(new_data);

        res.end(new_data);
    })

});

// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var new_note = req.body;
    print(new_note)
    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        var json = JSON.parse(data)
        print(json)
        json.push(new_note)
        print(json)
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), function (err, data) {
            if (err) throw err;
            // return JSON.stringify(json)
        })
    });

    // // Using a RegEx Pattern to remove spaces from newCharacter
    // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // new_note.routeName = new_note.name.replace(/\s+/g, "").toLowerCase();

    // console.log(new_note);

    // db.push(new_note);

    // res.json(new_note);
});


// Displays a single character, or returns false
app.delete("/api/notes/:id", function (req, res) {
    var chosen_id = req.params.id;

    console.log(chosen_id);

    for (var i = 0; i < chosen_id.length; i++) {
        if (chosen_id === chosen_id[i].routeName) {
            return res.json(chosen_id[i]);
        }
    }

    return res.json(false);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


const print = x => console.log(x);