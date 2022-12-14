const express = require('express');
const router = express.Router();
const notes = require('../db/db.json');
const uuid = require('uuid');
const fs = require('fs');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// get notes
router.get('/', (req, res) => {
  // res.json(notes);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

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

// delete a note
router.delete('/:id', (req, res) => {
  // if (notes.some(note => note.id === req.params.id)) {
    console.log('Original note list: ' + JSON.stringify(notes, null, 2));
    const newNoteList = notes.filter(note => note.id !== req.params.id);
    console.log('New note list: ' + JSON.stringify(newNoteList, null, 2));
    writeToFile('./db/db.json', newNoteList);
    res.json(notes);

  // } else {
  //   res.status(400).json({msg: 'This note does not exist'});
  // }
});

// deleteOneNote = (notes, id) => {
//   const notesList = require('../db/db.json');
//   const newNoteList = notesList.filter(note => note.id !== id);
//   writeToFile('./db/db.json', newNoteList);
//   return newNoteList;
// }


// // example code
// router.delete('/:id', (req, res) => {
//   // t=havent hecked this delete func code
//   deleteOneNote(req.params.id)
//   .then(() => res.json({ ok: true }))
//   .catch((err) => res.status(500).json(err))
// })
module.exports = router;