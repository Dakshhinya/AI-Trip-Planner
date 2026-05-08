const Trip = require('../models/tripModel');
const { redisClient } = require('../config/redis');

exports.createTrip = async (req, res) => {
    console.log("Incoming saveTrip request!");
    const { userSelection, tripData, userEmail, id } = req.body;

    if (!userSelection || !tripData || !userEmail || !id) {
        console.log("Missing fields in request");
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        console.log("Creating new trip object...");
        const newTrip = new Trip({
            userSelection,
            tripData,
            userEmail,
            id
        });

        console.log("Saving trip to database...");
        await newTrip.save(); //save to Mongo
        console.log("Trip saved successfully!");
        res.status(201).json({ message: 'Trip saved successfully', trip: newTrip });
    } catch (error) {
        console.error('Error saving trip:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTripsByUser = async (req, res) => {
    const { email } = req.params;

    try {
        const cacheKey = `userTrips:${email}`;
        const cachedTrips = await redisClient.get(cacheKey);
        if (cachedTrips) {
            console.log('Serving from Redis Cache');
            return res.status(200).json(JSON.parse(cachedTrips));
        }
        const trips = await Trip.find({ userEmail: email }).sort({ createdAt: -1 });
        await redisClient.set(
            cacheKey,
            JSON.stringify(trips),
            {
                EX: 3600
            }
        );
        console.log('Serving from MongoDB');
        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTripById = async (req, res) => {
    const { id } = req.params;

    try {
        const trip = await Trip.findOne({ id });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
