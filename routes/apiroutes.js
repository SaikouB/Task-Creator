// Api router
const api = require('express').Router();
// file system to write notes
const fs = require('fs');
const path = require('path');
// Generates unique ID for each note
const uuid = require('../helpers/uuid.js');
// api route to get note
api.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for new note`);
    fs.readFile(path.join(__dirname, '../db/notes.json'), 'UTF-8', (error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.json(JSON.parse(data));
        }
    })
});
// api route to post note
api.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/notes.json'), 'UTF-8', (error, data) => {
        if (error) {
            res.json(error)
        } else {
            const notes = JSON.parse(data);
            const { title, text } = req.body;

            if (title && text) {
                const newNote = {
                    title,
                    text,
                    note_id: uuid(),
                };
                notes.push(newNote);
                fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(notes), (error) => {
                    if (error) {
                        res.status(400).send('Error creating new note');
                    } else {
                        res.json('Successfully added new note');
                    }
                });
            }
        }
    })
});
// api route to delete note
api.delete('/api/notes/:id', (req, res) => {

    const noteId = req.params.id;

    fs.readFile(path.join(__dirname, '../db/notes.json'), 'UTF-8', (error, data) => {
        if (error) {
            res.json(error)
        } else {
            const notes = JSON.parse(data);
            const deleteNoteIndex = notes.findIndex((note) => note.note_id === noteId);

            if (deleteNoteIndex !== -1) {
                notes.splice(deleteNoteIndex, 1);
                fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(notes), (error) => {
                    if (error) {
                        res.status(400).json({ error: 'Error deleting note' });
                    } else {
                        res.json({ message: 'Note deleted' });
                    }
                });
            }
        }
    })
})

module.exports = api;