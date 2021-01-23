const router = require("express").Router();
const databaseFunction = require("../db/index.js");

router.get("/notes", function (req, res) {
  databaseFunction.getNotes().then((notes) => {res.json(notes)});
  //this is where we need functionality which reads the db.json file & sends it back on the response

});

router.post("/notes", function (req, res) {
  //this should receive a new note & save to db.json file
  databaseFunction
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", function (req, res) {
  //this should take the id on the parameter & delete the note with this id
  databaseFunction
    .removeNote(parseInt(req.params.id))
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
