const express = require('express');
const helmet = require('helmet');
const server = express();
const CarsRouter = require('./cars/cars-router.js');

server.use(express.json());
server.use(helmet());

server.use('/api/cars', CarsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Welceom to Node DB2 Project for Cars</h2>');
});

module.exports = server;
