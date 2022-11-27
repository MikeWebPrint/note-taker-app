const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, './public')));
app.get('/notes', (req, res) => {
  res.redirect('notes.html');
})
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})