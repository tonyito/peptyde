/* eslint-disable function-paren-newline */
const express = require('express');

const mainController = require('../controllers/mainController.js');

const router = express.Router();

router.get('/location',
  mainController.getLocations,
  (req, res) => res.status(200).json(res.locals.locations)
);

router.get('/locationDetail',
  mainController.getItems,
  (req, res) => res.status(200).json(res.locals.items)
);

module.exports = router;