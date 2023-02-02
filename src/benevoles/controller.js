const queries = require("./queries");
const pool = require("../../config");

// Get all benevoles
exports.getAllBenevoles = async (req, res) => {
    try {
        const allBenevoles = await pool.query(queries.getAllBenevoles)
        res.status(200).json(allBenevoles.rows);
    } catch (err) {
        console.error(err.message);
    }
}

// Get benevole by id
exports.getBenevoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const benevole = await pool.query(queries.getBenevoleById, [id]);
        res.status(200).json(benevole.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

// Create benevole
exports.createBenevole = async (req, res) => {
    try {
        const { prenom, nom, email } = req.body;
        const newBenevole = await pool.query(queries.createBenevole, [prenom, nom, email]);
        res.status(201).json(newBenevole.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

// Update benevole
exports.updateBenevole = async (req, res) => {
    try {
        const { id } = req.params;
        const { prenom, nom, email } = req.body;
        const updateBenevole = await pool.query(queries.updateBenevole, [prenom, nom, email, id]);
        res.status(200).json(updateBenevole.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

// Delete benevole
exports.deleteBenevole = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBenevole = await pool.query(queries.deleteBenevole, [id]);
        res.status(200).json(deleteBenevole.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

// Get all benevoles by zone id
exports.getAllBenevolesByZoneId = async (req, res) => {
    try {
        const { id } = req.params;
        const allBenevoles = await pool.query(queries.getAllBenevolesByZoneId, [id]);
        res.status(200).json(allBenevoles.rows);
    } catch (err) {
        console.error(err.message);
    }
}

// Get all benevoles by creneau id
exports.getAllBenevolesByCreneauId = async (req, res) => {
    try {
        const { id } = req.params;
        const allBenevoles = await pool.query(queries.getAllBenevolesByCreneauId, [id]);
        res.status(200).json(allBenevoles.rows);
    } catch (err) {
        console.error(err.message);
    }
}