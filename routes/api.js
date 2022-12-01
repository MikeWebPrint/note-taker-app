const express = require('express');
const router = express.Router();
const notes = require('../db/db.json');
const uuid = require('uuid');
const fs = require('fs');

// get notes
router.get('/', (req, res) => {
  res.json(notes);
});
// add a note
router.post('/', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  }

  if (!newNote.title || !newNote.text) {
    return res.status(400).json({msg: 'Please give your note a title and text'});
  }

  notes.push(newNote);
  res.json(notes);
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
        res.json({msg: 'Note updated', note})
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