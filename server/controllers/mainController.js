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

  mainController.getItems = (req, res, next) => {
    // write code here
    Item.find({location_id: req.query.id}, (err, item) => {
      if (err) next({
        log: `Express error handler caught getCharacters error ${err}`,
        status: 400,
        message: { err: `${err}`},
      });
      else {
      res.locals.items = item;
      next();
      }
    })
  }

  mainController.getCatalog = (req, res, next) => {
    // write code here
    Category.find({}, (err, items) => {
      if (err) next({
        log: `Express error handler caught getCharacters error ${err}`,
        status: 400,
        message: { err: `${err}`},
      });
      else {
      res.locals.catalog = items;
      next();
      }
    })
  }


module.exports = mainController;