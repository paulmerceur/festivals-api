const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const benevolesRouter= require('./src/benevoles/routes');
const jeuxRouter= require('./src/jeux/routes');
const zonesRouter= require('./src/zones/routes');
const creneauxRouter= require('./src/creneaux/routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/benevoles', benevolesRouter);
app.use('/jeux', jeuxRouter);
app.use('/zones', zonesRouter);
app.use('/creneaux', creneauxRouter);

app.listen(port, () => {
    console.log(`App started on port ${port}`)
});

