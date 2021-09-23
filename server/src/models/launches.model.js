const launches = new Map();
const launchesDatabase = require('./launches.mongo');
const planetsDatabase = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    DEFAULT_FLIGHT_NUMBER,
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
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true,
    });

}


async function existsLaunchWithId(launchId) {
    return launchesDatabase.findOne({
        flightNumber: launchId
    });
}

async function getAllLaunches() {
    return launchesDatabase.find({});
}

async function scheduleNewLaunch(launch) {
    try {
        const flightNumber = await getLatestFlightNumber() + 1;

        Object.assign(launch, {
            flightNumber,
            success: true,
            upcoming: true,
            customer: ['ZTM', 'NASA']
        })

        await saveLaunch(launch);
    } catch (err) {
        console.log(err);
    }
}

async function abortLaunchById(launchId) {
    const aborted = launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        success: false,
        upcoming: false
    });

    return aborted.ok === 1 && aborted.nModified === 1;
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');


    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
    isLaunchExists: existsLaunchWithId,
}