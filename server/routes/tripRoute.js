const express = require('express');
const { createTrip, getTripsByUser, getTripById } = require('../controllers/tripController');
const router = express.Router();

router.post('/save-trip', createTrip);
router.get('/user-trips/:email', getTripsByUser);
router.get('/:id', getTripById);

module.exports = router;
