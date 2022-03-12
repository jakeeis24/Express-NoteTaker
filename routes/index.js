const express = require("express");
const app = express();
//import modular router for /notes
const noteRouter = require("./apiNotes");
//middleware for noteRouter
app.use("/notes", noteRouter);

module.exports = app;
