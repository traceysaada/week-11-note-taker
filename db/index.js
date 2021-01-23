const fs = require("fs");
const util = require("util");

const asyncReadFile = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DatabaseFunction {
  read() {
    return asyncReadFile("db/db.json");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    //in here we need to write a function to get notes from db.json & return
    return this.read().then((notes) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    const newNote = { title, text };
    return this.getNotes()
      .then((notes) =>{
        if(notes.length === 0) {
          newNote.id = 0;
        } else {
          newNote.id = notes[notes.length-1].id + 1;
        }
        return [...notes, newNote]
        })
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        console.log(filteredNotes)
        this.write(filteredNotes);
      })
      // .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new DatabaseFunction();
