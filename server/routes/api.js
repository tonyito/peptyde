/* eslint-disable function-paren-newline */
const express = require('express');

const mainController = require('../controllers/mainController.js');

const router = express.Router();

router.get('/location',
  mainController.getLocations,
  (req, res) => res.status(200).json(res.locals.locations)
);

module.exports = router;