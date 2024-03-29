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
    const { nom, nb_benevoles_min, festival } = req.body;
    try {
        const { data: zone, error } = await supabase
            .from("zones")
            .insert({ nom, nb_benevoles_min, festival })
            .select("*");
        if (error) throw error;
        res.status(200).json(zone[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

    

// Update a zone
router.updateZone = async (req, res) => {
    const { nom, nb_benevoles_min, festival } = req.body;
    try {
        const { data: zone, error } = await supabase
            .from("zones")
            .update({ nom, nb_benevoles_min, festival: festival })
            .eq("id", req.params.id)
            .select("*");
        if (error) throw error;
        res.status(200).json(zone[0]);
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


//getAffecationByZone
router.getAffectationsByZone = async (req, res) => {
    try {
        const { data: affecation, error } = await supabase
            .from("affectations")
            .select(`
                id,
                is_dispo,
                benevole(*),
                zone(*),
                creneau(*)
            `)
            .eq("zone", req.params.id);
        if (error) throw error;
        res.status(200).json(affecation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

router.createZonesForFestival = async (req, res) => {
    const { festivalId, zones } = req.body;

    try {
      const createdZones = [];
      for (const zone of zones) {
        const { data: createdZone, error } = await supabase
            .from("zones")
            .insert({ ...zone, festival: festivalId })
            .select("*");
        if (error) throw error;
        const zoneId = createdZone[0].id;
        createdZones.push({ ...createdZone[0], affectations: [] });
      }
        res.status(200).json(createdZones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

  

module.exports = router;