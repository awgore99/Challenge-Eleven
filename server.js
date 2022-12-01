var express = require("express");
var path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require('uuid');

var app = express();
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// From UT-Bootcamp Module 11 Express Mini Project fsUtils.js
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// Routing for HTML
//      Route for index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//      Route for notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Routing for db.json
// GET route for db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
      if (error) {
        return console.log(error)
      }
      res.json(JSON.parse(data))
    })
  });

// POST route for db.json
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        noteID: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
});

// Server listening
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
});