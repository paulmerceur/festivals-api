const supabase = require("../../config");

// Get all benevoles
exports.getAllBenevoles = async (req, res) => {
    const { data, error } = await supabase.from("benevoles").select("*");
    if (error) {
        res.status(400).json(error);
    }
    res.status(200).json(data);
}
