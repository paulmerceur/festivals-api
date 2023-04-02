const express = require('express');
const router = express.Router();
const supabase = require("../../config");

//create a festival
router.createFestival = async (req, res) => {
    const { nom, date_debut, date_fin, heure_debut, heure_fin } = req.body;
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

        const { data: zoneData, error: zoneError } = await supabase
            .from("zones")
            .select("*")
            .eq("festival", createdFestival[0].id);

        if (zoneError) throw zoneError;

        const zones = zoneData.map((zone) => ({
            id: zone.id,
            nom: zone.nom,
            festival: zone.festival,
            nb_benevoles_min: zone.nb_benevoles_min
        }));

        const festival = {
            ...createdFestival[0],
            zones
        };

        res.status(200).json(festival);
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
//renvoie les infos des festivals et la liste des zones pour chaque festival
router.getAllFestivals = async (req, res) => {
    try {
      const { data, error } = await supabase.from("festivals").select("*");
  
      if (error) throw error;
  
      const festivals = await Promise.all(
        data.map(async (festival) => {
          const { data: zones, error } = await supabase
            .from("zones")
            .select("*")
            .eq("festival", festival.id);
  
          if (error) throw error;
  
          return {
            ...festival,
            zones: zones.map((zone) => ({
              id: zone.id,
              nom: zone.nom,
              festival: zone.festival,
              nb_benevoles_min: zone.nb_benevoles_min,
            })),
          };
        })
      );
  
      res.status(200).json(festivals);
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

        // Select zones for the festival
        const { data: zoneData } = await supabase
            .from("zones")
            .select("*")
            .eq("festival", data[0].id);

        // Map the zoneData array to new zone objects
        const zones = zoneData.map((zone) => ({
            id: zone.id,
            nom: zone.nom,
            festival: zone.festival,
            nb_benevoles_min: zone.nb_benevoles_min
        }));

        // Return the festival object with the zones array
        const festival = {
            ...data[0],
            zones,
        };

        res.status(200).json(festival);
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

// Get all benevoles by festival
router.getBenevolesByFestival = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("benevoles_festivals")
            .select(`
               benevole: benevole(*)
            `)
            .eq("festival", req.params.id);
        if (error) throw error;

        const modifiedData = data.map((item) => {
            const { benevole, ...rest } = item;
            return { id: benevole.id, ...benevole, ...rest };
        });

        res.status(200).json(modifiedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add benevole to a festival and create affectations for each creneau
router.addBenevoleToFestival = async (req, res) => {
    const { festivalId, benevoleId } = req.params;
    try {
        const { data, error } = await supabase
            .from("benevoles_festivals")
            .insert({ benevole: benevoleId, festival: festivalId })
            .select("*");
        if (error) throw error;

        const { data: creneaux, error: creneauxError } = await supabase
            .from("creneaux")
            .select("*")
            .eq("festival", festivalId);
        if (creneauxError) throw creneauxError;

        const affectations = creneaux.map((creneau) => ({
            benevole: benevoleId,
            creneau: creneau.id,
            is_dispo: false,
            zone: null,
        }));

        const { data: createdAffectations, error: affectationsError } = await supabase
            .from("affectations")
            .insert(affectations)
            .select("*");
        if (affectationsError) throw affectationsError;

        res.status(200).json(createdAffectations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





    

module.exports = router;