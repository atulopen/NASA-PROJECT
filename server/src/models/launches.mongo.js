const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
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
        type: Array
    },
    upcoming: {
        required: true,
        type: Boolean
    },
    success: {
        required: true,
        type: Boolean
    }
});

module.exports = mongoose.model('Launch', launchesSchema);