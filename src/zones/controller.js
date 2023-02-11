const supabase = require("../../config");

// Get all zones
exports.getAllZones = async (req, res) => {
    try {
        const { data: zones, error } = await supabase.from("zones").select("*");
        if (error) throw error;
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get zone by id
exports.getZoneById = async (req, res) => {
    try {
        const { data: zone, error } = await supabase
            .from("zones")
            .select("*")
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(zone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new zone
exports.createZone = async (req, res) => {
    try {
        const { data: zone, error } = await supabase
            .from("zones")
            .insert([{ ...req.body }]);
        if (error) throw error;
        res.status(200).json(zone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a zone
exports.updateZone = async (req, res) => {
    try {
        const { data: zone, error } = await supabase
            .from("zones")
            .update(req.body)
            .eq("id", req.params.id);
        if (error) throw error;
        res.status(200).json(zone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a zone
exports.deleteZone = async (req, res) => {
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