const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express();
const port = 3000;

const benevolesRoutes = require('./src/benevoles/routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/benevoles', benevolesRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

