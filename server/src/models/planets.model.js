const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanet = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

const fileReader = fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'));

fileReader.pipe(parse({
    comment: "#",
    columns: true
}))

fileReader.on('data', (data) => {
    if (isHabitablePlanet(data)) {
        habitablePlanet.push(data);
    }
});

fileReader.on('end', () => {
    fileReader.close();
})

fileReader.on('error', () => {
    console.log('error');
})


module.exports = {
    planet: habitablePlanet
}