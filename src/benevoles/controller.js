const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all benevoles
router.getAllBenevoles = async (req, res) => {
    const { data, error } = await supabase.from("benevoles").select("*");
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Get benevole by id
router.getBenevoleById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").select("*").eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Create benevole
router.createBenevole = async (req, res) => {
    const { prenom, nom, email } = req.body;
    try {
        const { data, error } = await supabase
            .from("benevoles")
            .insert([{ prenom, nom, email }])
            .select("*")
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update benevole
router.updateBenevole = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").update(req.body).eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Delete benevole
router.deleteBenevole = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").delete().eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Get benevole by creneau
router.getBenevoleByCreneau = async (req, res) => {
    const { creneau } = req.params;
    console.log(creneau)
    const { data, error } = await supabase
        .from("creneaux")
        .select(`
        zone(nom),
        benevoles(*)
        `)
        .eq("creneau", creneau);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Get benevole by zone id
router.getBenevoleByZoneId = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("creneaux")
        .select(`
        creneau,
        benevoles(*)
        `)
        .eq("zone", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

module.exports = router;