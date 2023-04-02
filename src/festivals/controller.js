const express = require('express');
const router = express.Router();
const supabase = require("../../config");

//create a festival
router.createFestival = async (req, res) => {
    const {nom, date_debut, date_fin, heure_debut, heure_fin} = req.body;
    try {
        const { data, error } = await supabase
            .from("festivals")
            .insert({ nom, date_debut, date_fin, heure_debut, heure_fin });

        if (error) throw error;

        const { data: createdFestival, error: selectError } = await supabase
            .from("festivals")
            .select("*")
            .eq("nom", nom);

        if (selectError) throw selectError;

        res.status(200).json(createdFestival[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Delete a festival
router.deleteFestival = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("festivals")
            .delete()
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all festivals
router.getAllFestivals = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("festivals")
            .select("*");
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get festival by id
router.getFestivalById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("festivals")
            .select("*")
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Get all zones by festival
router.getZonesByFestival = async (req, res) => {

    try {
        const { data, error } = await supabase
            .from("zones")
            .select("*")
            .eq("festival", req.params.id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add creneaux to a festival
router.addCreneauxToFestival = async (req, res) => {
    const { id } = req.params;
    let creneauxJson = req.body;
  
    try {
      let createdCreneaux = [];
      const creneaux = JSON.parse(JSON.stringify(creneauxJson));
      if (!Array.isArray(creneaux)) {
        throw new Error("creneaux must be an array");
      }
      for (const creneau of creneaux) {
        const { data, error } = await supabase
          .from("creneaux")
          .insert({ ...creneau, festival: id })
          .select("*");
        if (error) throw error;
        createdCreneaux.push(data[0]);
      }
      res.status(200).json(createdCreneaux);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    

module.exports = router;