const express = require('express');
const router = express.Router();
const notes = require('../db/db.json');
const uuid = require('uuid');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// get notes
router.get('/', (req, res) => {
  // res.json(notes);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// add a note
// router.post('/', (req, res) => {
//   const newNote = {
//     id: uuid.v4(),
//     title: req.body.title,
//     text: req.body.text
//   }

//   if (!newNote.title || !newNote.text) {
//     return res.status(400).json({msg: 'Please give your note a title and text'});
//   }
//   const noteList = JSON.parse(notes);
//   const addNote = newNote => noteList.push(newNote)
//   fs.appendFileSync('notes', addNote(newNote), {encoding: 'utf-8',flag: 'w' });
//   res.json(notes);
// });




router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { id, title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuid.v4(),
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});






// change a note
router.put('/:id', (req, res) => {
  const found = notes.some(note => note.id === req.params.id);

  if (found) {
    const updNote = req.body;
    notes.forEach(note => {
      if (note.id === req.params.id){
        note.title = updNote.title ? updNote.title : note.title;
        note.text = updNote.text ? updNote.text : note.text;
        res.json( note).json({msg: 'Note updated'})
      }
    });
  } else {
    res.status(400).json({msg: 'This note does not exist'});
  }
});

// delete a note
router.delete('/:id', (req, res) => {
  const found = notes.some(note => note.id === req.params.id);

  if (found) {
    res.json({ msg: 'Note deleted', notes: notes.filter(note => note.id !== req.params.id)});
  } else {
    res.status(400).json({msg: 'This note does not exist'});
  }
});

module.exports = router;