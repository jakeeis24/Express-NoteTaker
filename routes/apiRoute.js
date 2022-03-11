const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const uuid = require("../helpers/uuid");
const router = express.Router();

//GET api notes
router.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const parseNotes = JSON.parse(data);
    res.send(parseNotes);
    console.log("ITS WORKS");
  });
});
//export
module.exports = router;
