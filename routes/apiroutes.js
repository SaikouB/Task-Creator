// Api router
const api = require('express').Router();
const fs = require('fs');
const path = require('path')
// Generates unique ID for each note
const uuid = require('../helpers/uuid.js');

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
api.delete('/api/notes/:id',(req, res) => {
    fs.readFile(path.join(__dirname, '../db/notes.json'), 'UTF-8', (error, data) => {
        if (error) {
            res.json(error)
        } else {
            const notes = JSON.parse(data);
            const { title, text } = req.body;
            console.log(req.params.id)
        }
    })         
})

module.exports = api;