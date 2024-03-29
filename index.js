const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Routes
const authRouter = require('./src/auth/routes');
const benevolesRouter= require('./src/benevoles/routes');
const zonesRouter= require('./src/zones/routes');
const creneauxRouter= require('./src/creneaux/routes');
const festivalsRouter= require('./src/festivals/routes');
const affectationsRouter= require('./src/affectations/routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/benevoles', benevolesRouter);
app.use('/zones', zonesRouter);
app.use('/creneaux', creneauxRouter);
app.use('/festivals', festivalsRouter);
app.use('/affectations', affectationsRouter);

app.listen(port, () => {
    console.log(`App started on port ${port}`)
});

