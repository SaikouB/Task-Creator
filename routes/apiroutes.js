// Api router
const api = require('express').Router();
const fs = require('fs').promises;
// Generates unique ID for each note
const uuid = require('../helpers/uuid.js');

api.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for new note`);
    let note = fs.readFile('./db/notes.json', 'UTF-8')
    .then(res.json(JSON.parse(note)));
});

api.post('/api/notes', (req, res) => {
    let note = JSON.parse(fs.readFile('./db/notes.json', 'UTF-8'));
    const { title } = req.body.title;
    const { text } = req.body.text;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        note.push(newNote);
        fs.writeFile('./db/notes.json', JSON.stringify(note));
        res.json('Successfully added new note');
    } else {
        res.status(400).send('Error creating new note');
    }
});

module.exports = api;