const supabase = require("../../config");

// Get all creneaux
exports.getAllCreneaux = async (req, res) => {
    try {
        const { data: creneaux, error } = await supabase.from("creneaux").select("*");
        if (error) throw error;
        res.status(200).json(creneaux);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get creneau by id
exports.getCreneauById = async (req, res) => {
    try {
        const { data: creneau, error } = await supabase
            .from("creneaux")
            .select("*")
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(creneau);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new creneau
exports.createCreneau = async (req, res) => {
    try {
        const { data: creneau, error } = await supabase
            .from("creneaux")
            .insert([{ ...req.body }]);
        if (error) throw error;
        res.status(200).json(creneau);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a creneau
exports.updateCreneau = async (req, res) => {
    try {
        const { data: creneau, error } = await supabase
            .from("creneaux")
            .update(req.body)
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(creneau);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a creneau
exports.deleteCreneau = async (req, res) => {
    try {
        const { data: creneau, error } = await supabase
            .from("creneaux")
            .delete()
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(creneau);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}