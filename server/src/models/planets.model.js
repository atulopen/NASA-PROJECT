const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('./planets.mongo');

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        const fileReader = fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv')).pipe(parse({
            comment: "#",
            columns: true
        }))

        fileReader.on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                await savePlanet(data);
            }
        });

        fileReader.on('end', async () => {
            const allPlanets = await getAllPlanets();
            console.log( allPlanets.map((planet) => {
                return planet.keplerName;
            }));
            console.log(`${allPlanets.length} habitable planets found!`);
            resolve();
        })

        fileReader.on('error', (err) => {
            console.log('error');
            reject(err);
        })
    })
}

async function savePlanet(data) {
    await planets.updateOne({
        keplerName: data.kepler_name,
    }, {
        keplerName: data.kepler_name,
    }, {
        upsert: true
    })
}

async function getAllPlanets() {
    return planets.find({});
}


module.exports = {
    loadPlanetsData,
    getAllPlanets,
}