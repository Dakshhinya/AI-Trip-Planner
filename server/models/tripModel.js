const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userSelection: {
        location: {
            label: String,
            value: Object
        },
        noOfDays: String,
        budget: String,
        traveller: String
    },
    tripData: {
        type: Object,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
