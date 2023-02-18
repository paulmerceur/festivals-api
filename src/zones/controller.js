const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all zones
router.getAllZones = async (req, res) => {
    try {
        const { data: zones, error } = await supabase.from("zones").select("*");
        if (error) throw error;
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get zone by id
router.getZoneById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("zones")
            .select("*")
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new zone
router.createZone = async (req, res) => {
    const { nom } = req.body;
    try {
        const { data, error } = await supabase
            .from("zones")
            .insert([{ nom }])
            .select("*")
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a zone
router.updateZone = async (req, res) => {
    const { nom } = req.body;
    try {
        const { data, error } = await supabase
            .from("zones")
            .update({ nom })
            .eq("id", req.params.id)
            .select("*");
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a zone
router.deleteZone = async (req, res) => {
    try {
        const { data: zone, error } = await supabase
            .from("zones")
            .delete()
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(zone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = router;