const {getAllLaunches, addNewLaunch} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        res.status(400);
        return res.json({
            error: 'Missing Required fields'
        })
    }
    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        res.status(400);
        return res.json({
            error: "Invalid launch date"
        })
    }
    addNewLaunch(launch);

    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}