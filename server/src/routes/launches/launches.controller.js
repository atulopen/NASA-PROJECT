const {
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch,
    isLaunchExists
} = require('../../models/launches.model');
const {response, json} = require("express");

async function httpGetAllLaunches(req, res) {
    return res.json(await getAllLaunches());
}

async function httpAbortLaunch(req, res) {
    const launchId = req.params.id;

    const existsLaunch = await isLaunchExists(launchId)

    if (!existsLaunch) {
        return response.status(404).json({
            error: 'Launch do not exist'
        })
    }

    const aborted = await abortLaunchById(Number(req.params.id));
    if (!aborted) {
        res.status(400).json({
            error: 'Launch not aborted'
        });
    }
    return res.status(200).json({
        ok: true
    });
}

async function httpAddNewLaunch(req, res) {
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

    await scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}