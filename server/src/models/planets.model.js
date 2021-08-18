const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

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

        fileReader.on('data', (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        });

        fileReader.on('end', () => {
            console.log(habitablePlanets.map((planet) => {
                return planet['kepler_name'];
            }));
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        })

        fileReader.on('error', (err) => {
            console.log('error');
            reject(err);
        })
    })
}


module.exports = {
    loadPlanetsData,
    planets: habitablePlanets
}