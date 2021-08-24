const {getAllLaunches, addNewLaunch, abortLaunchById, existsLaunchById} = require('../../models/launches.model');
const {response} = require("express");

function httpGetAllLaunches(req, res) {
    return res.json(getAllLaunches());
}

function httpAbortLaunch(req, res) {
    const id = req.params.id;

    if (existsLaunchById(id)) {
        return response.status(404).json({
            error: 'Launch do not exist'
        })
    }

    abortLaunchById(Number(req.params.id));
    return res.status(200).end();
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
    httpAbortLaunch,
}