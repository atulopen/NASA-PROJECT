const launches = new Map();
const launchesDatabase = require('./launches.mongo');
const planetsDatabase = require('./planets.mongo');

let flightNumber = 100;

const launch = {
    flightNumber,
    mission: 'Arthur Mission',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 22, 2030'),
    target: 'Kepler-1652 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

saveLaunch(launch);

async function saveLaunch(launch) {
    const planet = await planetsDatabase.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('No Matching Planet Found!');
    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });

}


function existsLaunchById(id) {
    return launches.has(id);
}

async function getAllLaunches() {
    return launchesDatabase.find({});
}

function addNewLaunch(launch) {
    flightNumber++;
    launches.set(flightNumber, Object.assign(launch, {
        flightNumber,
        customer: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
    }));
}

function abortLaunchById(id) {
    const aborted = launches.get(id);
    aborted.success = false;
    aborted.upcoming = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
    existsLaunchById,
}