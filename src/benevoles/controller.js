const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all benevoles
router.getAllBenevoles = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }

    const { data, error } = await supabase.from("benevoles").select("*");
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Get benevole by id
router.getBenevoleById = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").select("*").eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data[0]);
}

// Create benevole
router.createBenevole = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
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
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    const { prenom, nom, email } = req.body;
    try {
        const { data, error } = await supabase
            .from("benevoles")
            .update({ prenom, nom, email })
            .eq("id", req.params.id)
            .select("*");
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete benevole
router.deleteBenevole = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").delete().eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}


module.exports = router;