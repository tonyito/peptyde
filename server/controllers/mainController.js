const models = require('../models/peptydeModels');

const mainController = {};

const { Item, Category, Location, User } = models;

mainController.getLocations = (req, res, next) => {
    // write code here
    Location.find({}, (err, location) => {
      if (err) next({
        log: `Express error handler caught getCharacters error ${err}`,
        status: 400,
        message: { err: `${err}`},
      });
      else {
      res.locals.locations = location;
      next();
      }
    })
  }

module.exports = mainController;