var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));