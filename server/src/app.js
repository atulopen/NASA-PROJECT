const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'localhost:3000'
}));

app.use('/planets', planetsRouter);

module.exports = app;