const {planets} = require('../../models/planets.model');

function getAllPlanets(req, res) {
    res.status(200);
    return res.json(planets);
}

module.exports = {
    getAllPlanets
}