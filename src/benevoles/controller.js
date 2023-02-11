const supabase = require("../../config");

// Get all benevoles
exports.getAllBenevoles = async (req, res) => {
    const { data, error } = await supabase.from("benevoles").select("*");
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Get benevole by id
exports.getBenevoleById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").select("*").eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Create benevole
exports.createBenevole = async (req, res) => {
    const { data, error } = await supabase.from("benevoles").insert(req.body);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Update benevole
exports.updateBenevole = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").update(req.body).eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}

// Delete benevole
exports.deleteBenevole = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("benevoles").delete().eq("id", id);
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}