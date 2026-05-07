const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                format: 'json',
                q: q,
                limit: 5,
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'AI-Trip-Planner' // Nominatim requires a user-agent
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error proxying Nominatim:', error.message);
        res.status(500).json({ message: 'Error fetching locations' });
    }
});

module.exports = router;
