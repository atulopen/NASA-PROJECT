const launches = new Map();

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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
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

module.exports = {
    getAllLaunches,
    addNewLaunch
}