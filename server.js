var express = require("express");
var path = require("path");
var fs = require("fs");

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