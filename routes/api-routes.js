const { route } = require("./html-routes");

const router = require("express").Router();

router.get("/notes", function (req, res) {
  //this is where we need functionality which reads the db.json file & sends it back on the response
});

router.post("/notes", function (req, res) {
  //this should receive a new note & save to db.json file
});

router.delete("/notes/:id", function (req, res) {
  //this should take the id on the parameter & delete the note with this id
});

module.exports = router;
