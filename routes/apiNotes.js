const express = require("express");
// const res = require("express/lib/response");
// const fs = require("fs");
const path = require("path");
const uuid = require("../helpers/uuid");
const router = express.Router();
const data = require("../db/db.json");

//utls file
const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
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
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//GET api notes
router.get("/api/notes", (req, res) => {
  console.log(`${req.method} req for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST api notes
router.post("/api/notes", (req, res) => {
  //log that the post request was received
  console.info(`${req.method} request received to post a note`);
  //destructure items in req body
  const { noteTitle, noteText } = req.body;
  if (noteTitle && noteText) {
    const newNote = { title, text, id: uuid() };
    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: "Finally!!!",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("u suk");
  }
  console.log(req.body);
});

//export
module.exports = router;
