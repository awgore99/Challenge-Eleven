var express = require("express");
var path = require("path");
var fs = require("fs");
const noteData = require("./db/db.json");
const readAndAppend = require('./helpers/fsUtils');

var app = express();
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Routing for HTML
//      Route for index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//      Route for notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Routing for db.json
app.get("/api/notes", (req, res) => 
    res.json(noteData)
);

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        noteID: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
})

// Server listening
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})