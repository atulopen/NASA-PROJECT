const {getAllPlanets} = require('../../models/planets.model');

function httpGetAllPlanets(req, res) {
    res.status(200);
    return res.json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
}