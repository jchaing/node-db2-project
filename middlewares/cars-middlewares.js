const db = require('../data/db-config');

function validateCarId(req, res, next) {
  const { id } = req.params;

  db('cars')
    .where('id', id)
    .then(car => {
      if (car.length > 0) {
        req.car = car;
        next();
      } else {
        res.status(400).json({ message: 'Invalid car ID' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to get ID', err });
    });
}

function validateCar(req, res, next) {
  const { vin, make, model, mileage } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing account data' });
  } else if (!vin || !make || !model || !mileage) {
    res
      .status(400)
      .json({ message: 'Missing vin, make, model or mileage field' });
  } else {
    next();
  }
}

function validateUniqueVin(req, res, next) {
  const { vin } = req.body;

  db('cars')
    .where('vin', vin)
    .then(unique => {
      if (unique.length > 0) {
        res.status(400).json({ message: 'VIN already in database', unique });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to validate VIN', err });
    });
}

function validateUniqueVinUpdate(req, res, next) {
  const { vin } = req.body;

  db('cars')
    .where('vin', vin)
    .then(unique => {
      if (unique.length === 0 || unique[0].vin === req.car[0].vin) {
        next();
      } else {
        res.status(400).json({ message: 'VIN is already in database', unique });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to validate VIN', err });
    });
}

module.exports = {
  validateCarId,
  validateCar,
  validateUniqueVin,
  validateUniqueVinUpdate
};
