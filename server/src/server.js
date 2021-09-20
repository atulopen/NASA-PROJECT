const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const {loadPlanetsData} = require('./models/planets.model')
const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://arthur_learning:dSb7b2ttopKXsLzs@nasacluster.otwsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongodb connection successful!');
})

mongoose.connection.once('error', (err) => {
    console.log(err);
})

async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
    })
}

startServer();

