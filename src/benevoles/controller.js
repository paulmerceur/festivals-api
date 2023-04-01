const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all benevoles 
router.getAllBenevoles = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("users_infos")
            .select("*")
            //where role = benevole
            .eq("role", "benevole");
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}







// Get benevole by id
router.getBenevoleById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("users_infos")
            .select("*")
            .eq("user_id", req.params.id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}








// Create benevole
router.createBenevole = async (req, res) => {    
    const { prenom, nom, email, role} = req.body;
    try {
        const { data, error } = await supabase
            .from("users_infos")
            .insert([{ prenom, nom, email, role }]);
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Update benevole
router.updateBenevole = async (req, res) => {
    const { id } = req.params;
    const { prenom, nom, email, role } = req.body;
    try {
        const { data, error } = await supabase
            .from("users_infos")
            .update({ prenom, nom, email, role })
            .eq("user_id", id);
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete benevole
router.deleteBenevole = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("users_infos")
            .delete()
            .eq("user_id", id);
        if (error) throw error;
        res.status(200).json({ message: "Benevole deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get festivals by benevole id
router.getFestivalsByBenevoleId = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("benevoles_festivals")
            .select(`
                festival(id, nom, date_debut, date_fin, heure_debut, heure_fin)
            `)
            .eq("benevole", req.params.id);

        if (error) throw error;

        // Transform the data array into a new array of festival objects
        const festivals = await Promise.all(
            data.map(async (row) => {
                // Select zones for the festival
                const { data: zoneData } = await supabase
                    .from("zones")
                    .select("*")
                    .eq("festival", row.festival.id);

                // Map the zoneData array to new zone objects
                const zones = zoneData.map((zone) => ({
                    id: zone.id,
                    nom: zone.nom,
                    festival: zone.festival,
                    nb_benevoles_min: zone.nb_benevoles_min
                }));

                // Return the festival object with the zones array
                return {
                    ...row.festival,
                    zones,
                };
            })
        );

        // Return the festivals as a JSON array
        res.status(200).json(festivals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





//------------------------------------------------------AFFECTATION----------------------------------------------------------

//getAffectationsByBenevoleIdAndFestivalId
router.getAffectationsByBenevoleIdAndFestivalId = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("affectations")
            .select(`zone(id, nom),
            creneau(id, date, heure_debut, heure_fin),
            benevole(user_id, prenom, nom, email, role),
            is_dispo,
            id
        `)
            .eq("benevole", req.params.benevoleId)
            //verifier si le festivalId est bien celui du benevole
            //le festivalId est dans la table creneaux
            //.eq("creneaux(festivals)", req.params.festivalId);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//updateAffectationByBenevoleId


module.exports = router;