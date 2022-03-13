const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const app = require(".");

//utls file

const uuid = require("../helpers/uuid.js");
const data = require("../db/db.json");

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

// Promisify version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
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
router.get("/", (req, res) => {
  console.log(`${req.method} req for /notes from apiNotes`);
  readFromFile("./db/db.json", "utf8").then((data) =>
    res.json(JSON.parse(data))
  );
});

//POST api notes
router.post("/", (req, res) => {
  //log that the post request was received
  console.info(`${req.method} request received to post a note`);
  //destructure items in req body
  const { title, text } = req.body;
  if (title && text) {
    const newNote = { title, text, id: uuid() };
    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: "Finally!!!",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("error in POST");
  }
  console.log(req.body);
});

//delete
router.delete(`/:id`, (req, res) => {
  readFromFile("./db/db.json", "utf8").then((data) => {
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    // let newData = [];
    // for (let i = 0; i < data.length; i++) {
    //   console.log(data, req.params.id, data[i].id);
    //   if (req.params.id === data[i].id) {
    //     data = data.splice(i, 0);
    //     console.log(data);
    //   }
    // }
    data = data.filter((data) => data.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2));
    res.json(data);
  });
});

//export
module.exports = router;
