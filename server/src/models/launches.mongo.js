const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        required: true,
        type: Number,
    },
    mission: {
        required: true,
        type: String
    },
    rocket: {
        required: true,
        type: String
    },
    launchDate: {
        required: true,
        type: Date
    },
    target: {
        required: true,
        type: String
    },
    customer: {
        required: true,
        type: [String]
    },
    upcoming: {
        required: true,
        type: Boolean
    },
    success: {
        required: true,
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Launch', launchesSchema);