const express = require('express');
const router = express.Router();
const supabase = require("../../config");

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

    

module.exports = router;