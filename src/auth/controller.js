const express = require('express');
const router = express.Router();
const supabase = require("../../config");

// Login user
router.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) throw error;

        const { data: userData, error: userError } = await supabase
            .from('users_infos')
            .select('nom, prenom')
            .eq('user_id', data.user.id)
            .single();

        if (userError) throw userError;

        res.status(200).json({ ...data, user_infos: { ...userData } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Register user
router.register = async (req, res) => {
    const { email, password, nom, prenom } = req.body;
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        if (error) throw error;

        const { data: userData, error: benevoleError } = await supabase
            .from('users_infos')
            .insert([{ user_id: data.user.id, nom: nom, prenom: prenom }]);

        if (benevoleError) throw benevoleError;

        res.status(201).json({ ...data, user_infos: { ...userData[0] } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Logout user
router.logout = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = router;