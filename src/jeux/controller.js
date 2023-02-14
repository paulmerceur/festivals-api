const supabase = require("../../config");

// Get all jeux
exports.getAllJeux = async (req, res) => {
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
exports.getJeuById = async (req, res) => {
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

// Get jeu by benevole
exports.getJeuxByBenevole = async (req, res) => {
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

// Create a new jeu
exports.createJeu = async (req, res) => {
    try {
        const { data: jeu, error } = await supabase
            .from("jeux")
            .insert([{ ...req.body }]);
        if (error) throw error;
        res.status(200).json(jeu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a jeu
exports.updateJeu = async (req, res) => {
    try {
        const { data: jeu, error } = await supabase
            .from("jeux")
            .update(req.body)
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(jeu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a jeu
exports.deleteJeu = async (req, res) => {
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