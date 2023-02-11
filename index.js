const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express();
const port = 3000;

const benevolesRoutes = require('./src/benevoles/routes');
const jeuxRoutes = require('./src/jeux/routes');
const zonesRoutes = require('./src/zones/routes');
const creneauxRoutes = require('./src/creneaux/routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/benevoles', benevolesRoutes);
app.use('/jeux', jeuxRoutes);
app.use('/zones', zonesRoutes);
app.use('/creneaux', creneauxRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

