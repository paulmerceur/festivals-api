const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Get all types
router.getAllTypes = async (req, res) => {
    try {
        const { data: types, error } = await supabase
            .rpc("get_types")
        if (error) throw error;
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = router;