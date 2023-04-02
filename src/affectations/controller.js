const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all affectations 
router.getAllAffectations = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("affectations")
            .select("*")
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update affectation
router.updateAffectation = async (req, res) => {
    const { id } = req.params;
    const { is_dispo, zone, benevole, creneau } = req.body;
    try {
        const { data, error } = await supabase
            .from("affectations")
            .update({ is_dispo, zone, benevole, creneau })
            .eq("id", id);
        if (error) throw error;
        res.status(200).json("Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Delete affectation
router.deleteAffectation = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("affectations")
            .delete()
            .eq("id", id);
        if (error) throw error;
        res.status(200).json("Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




module.exports = router;