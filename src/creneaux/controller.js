const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all creneaux
router.getAllCreneaux = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .select(`
                festival(id, nom),
                heure_debut,
                heure_fin,
                date
            `)
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get creneau by id
router.getCreneauById = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .select(`
                festival(id, nom),
                heure_debut,
                heure_fin,
                date
            `)
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// //Get creneau by festival
// router.getCreneauByFestival = async (req, res) => {
//     // Check if user is logged in
//     const user = req.auth.user();
//     if (!user) {
//         res.status(401).json({ error: "Unauthorized" });
//     }

//     try {
//         const { data, error } = await supabase
//             .from("creneaux")
//             .select(`
//                 festival(id, nom),
//                 heure_debut,
//                 heure_fin,
//                 date
//             `)
//             .eq("festival", req.params.id);
//         if (error) throw error;
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


// Create a new creneau
router.createCreneau = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    const {festival, heure_debut, heure_fin, date} = req.body;
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .insert({ festival, heure_debut, heure_fin, date })
            .select("*");
        if (error) throw error;
        res.status(200).json(data[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a creneau
router.updateCreneau = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    const {festival, heure_debut, heure_fin, date} = req.body;
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .update({ festival, heure_debut, heure_fin, date })
            .eq("id", req.params.id)
            .select("*");
        if (error) throw error;
        res.status(200).json(data[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a creneau
router.deleteCreneau = async (req, res) => {
    // Check if user is logged in
    const user = req.auth.user();
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
        const { data, error } = await supabase
            .from("creneaux")
            .delete()
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = router;