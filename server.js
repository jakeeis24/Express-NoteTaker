const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./routes/index.js");

//----------unique id's
//const uuid = require("./helpers/uuid");
const PORT = process.env.PORT || 9420;

const app = express();

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

//GET route for home page
app.get("/", (req, res) => {
  console.log("/ GET");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET Route for notes page
app.get("/notes", (req, res) => {
  console.log("Notes GET server.js");
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//returns index.html file
app.get("*", (req, res) => {
  console.log("WILD");
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
