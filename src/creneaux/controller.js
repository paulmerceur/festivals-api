const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all creneaux
router.getAllCreneaux = async (req, res) => {
    try {
        const { data: creneaux, error } = await supabase.from("creneaux").select("*");
        if (error) throw error;
        res.status(200).json(creneaux);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get creneau by id
router.getCreneauById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .select("*")
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new creneau
router.createCreneau = async (req, res) => {
    const {zone, benevole, creneau} = req.body;
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .insert([{ zone, benevole, creneau }])
            .select("*")
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a creneau
router.updateCreneau = async (req, res) => {
    const {zone, benevole, creneau} = req.body;
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .update({ zone, benevole, creneau })
            .eq("id", req.params.id)
            .select("*");
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a creneau
router.deleteCreneau = async (req, res) => {
    try {
        const { data: creneau, error } = await supabase
            .from("creneaux")
            .delete()
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(creneau);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = router;