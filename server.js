const express = require('express');
const htmlRoutes = require('./routes/htmlroutes.js');
const apiRoutes = require('./routes/apiroutes.js');
const app = express();

// Api port being used
const PORT = process.env.PORT || 3001;

// Middleware usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(apiRoutes);
app.use(htmlRoutes);

// Listens for port activity
app.listen(PORT, () =>
    console.log(`I'm listening 👂 @ http://localhost:${PORT}`)
);