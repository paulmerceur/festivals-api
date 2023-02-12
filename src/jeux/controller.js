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
                zone: zone (nom)
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
                zone: zone (nom)
            `)
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(jeu);
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