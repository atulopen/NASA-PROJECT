const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Arthur Mission',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 22, 2030'),
    destination: 'Kepler-1652 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

module.exports = {
    launches
}