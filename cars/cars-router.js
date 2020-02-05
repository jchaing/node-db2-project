const express = require('express');
const knex = require('knex');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could load cars', err });
    });
});

router.post('/', (req, res) => {
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

module.exports = router;
