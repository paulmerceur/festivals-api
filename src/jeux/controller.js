const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all jeux
router.getAllJeux = async (req, res) => {
    try {
        const { data: jeux, error } = await supabase
            .from("jeux")
            .select(`
                id,
                nom,
                type,
                zone: zone (id, nom)
            `);
        if (error) throw error;
        res.status(200).json(jeux);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get jeu by id
router.getJeuById = async (req, res) => {
    try {
        const { data: jeu, error } = await supabase
            .from("jeux")
            .select(`
                id,
                nom,
                type,
                zone: zone (id, nom)
            `)
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(jeu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all jeux by benevole
router.getJeuxByBenevole = async (req, res) => {
    try {
        const { data: creneaux, error } = await supabase
            .from("creneaux")
            .select("creneau, zone, benevole")
            .eq("benevole", req.params.id);
        if (error) throw error;

        const zoneIds = creneaux.map(creneau => creneau.zone);

        const { data: jeux, error: error2 } = await supabase
            .from("jeux")
            .select("id, nom, zone(*)")
            .in("zone", zoneIds);
        if (error2) throw error2;
        const result = creneaux.map(creneau => {
            const jeu = jeux.find(j => j.zone.id === creneau.zone);
            return {
                id: jeu.id,
                nom: jeu.nom,
                zone: jeu.zone,
                creneau: creneau.creneau
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all jeux by zone
router.getJeuxByZone = async (req, res) => {
    try {
        const { data: jeu, error } = await supabase
            .from("jeux")
            .select(`
                id,
                nom,
                type,
                zone: zone (id)
            `)
            .eq("zone", req.params.id);
        if (error) throw error;
        res.status(200).json(jeu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new jeu
router.createJeu = async (req, res) => {
    const { nom, type, zone } = req.body;
    try {
        const { data, error } = await supabase
            .from("jeux")
            .insert([{ nom, type, zone }])
            .select("*")
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a jeu
router.updateJeu = async (req, res) => {
    const { nom, type, zone } = req.body;
    try {
        const { data, error } = await supabase
            .from("jeux")
            .update({ nom, type, zone })
            .eq("id", req.params.id)
            .select("*");
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a jeu
router.deleteJeu = async (req, res) => {
    try {
        const { data: jeu, error } = await supabase
            .from("jeux")
            .delete()
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(jeu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = router;