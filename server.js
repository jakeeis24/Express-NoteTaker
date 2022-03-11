const express = require("express");
const path = require("path");
const fs = require("fs");
//----------unique id's
//const uuid = require("./helpers/uuid");
const PORT = process.env.PORT || 9420;
const app = express();

//array for note objects in db.json
let notes = [];

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api)

app.use(express.static("public"));

//GET route for home page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// app.get("/api/notes", (req, res) =>
//   res.sendFile(
//     path.join(__dirname, "./db/db.json", "utf-8", (err, data) => {
//       if (err) {
//         console.log(err, "dis be da problem");
//       }
//       const parsedNotes = JSON.parse(data);
//       res.sendFile(parsedNotes);
//     })
//   )
// );
//listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
