const express = require('express');
const knex = require('knex');

const db = require('../data/db-config.js');

const router = express.Router();

const {
  validateCarId,
  validateCar,
  validateUniqueVin,
  validateUniqueVinUpdate
} = require('../middlewares/cars-middlewares.js');

// GET cars
router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could load cars', err });
    });
});

// GET cars by id
router.get('/:id', validateCarId, (req, res) => {
  res.status(200).json(req.car);
});

// POST new car {vin, make, model, mileage, transmission, title_status}
router.post('/', validateCar, validateUniqueVin, (req, res) => {
  const accountData = req.body;

  db('cars')
    .insert(accountData)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to post car', err });
    });
});

// PUT updating a car {vin, make, model, mileage, transmission, title_status}
router.put(
  '/:id',
  validateCarId,
  validateCar,
  validateUniqueVinUpdate,
  (req, res) => {
    const { id } = req.params;

    db('cars')
      .where('id', id)
      .update(req.body)
      .then(updated => {
        res.status(200).json({ updated: updated });
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to update car', err });
      });
  }
);

// DELETE car by id
router.delete('/:id', validateCarId, (req, res) => {
  const { id } = req.params;

  db('cars')
    .where('id', id)
    .del()
    .then(deleted => {
      res.status(200).json({ deleted: deleted });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete the car', err });
    });
});

module.exports = router;
