const express = require('express');
const path = require('path');
const app = express();
const logger = require('./logger.js');
const PORT = process.env.PORT || 3001;

// middleware 
app.use(logger);
// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false }));

// Create static folder
app.use(express.static(path.join(__dirname, 'public')));
// create api routes
app.use('/api/notes', require('./routes/api.js'));
// path to notes file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// serve the index page to all other paths
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
// set up the server to listen
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});