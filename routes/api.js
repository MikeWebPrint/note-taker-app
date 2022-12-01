const express = require('express');
const router = express.Router();
const notes = require('../db/db.json');
const uuid = require('uuid');

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

// delete a note


module.exports = router;