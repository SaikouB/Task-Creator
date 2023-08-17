// html router and path
const html = require('express').Router();
const path = require('path');

// Notes route
html.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// Homepage route
html.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html;