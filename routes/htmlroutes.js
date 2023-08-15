// HTML route
const html = require('express').Router();
const path = require('path');

console.log(__dirname)
// Getting route for notes.html
html.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// Getting route for homepage
html.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);
module.exports = html;