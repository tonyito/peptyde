const models = require('../models/peptydeModels');

const mainController = {};

const { Item, Category, Location, User } = models;

//middleware to get all locations
mainController.getLocations = (req, res, next) => {

  Location.find({}, (err, location) => {
    if (err)
      next({
        log: `Express error handler caught getLocations error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.locations = location;
      next();
    }
  });
};

//middleware to list all items in a location 
mainController.getItems = (req, res, next) => {

  Item.find({ location_id: req.query.id }, (err, item) => {
    if (err)
      next({
        log: `Express error handler caught getItems error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.items = item;
      next();
    }
  });
};

//middleware to get all categories
mainController.getCatalog = (req, res, next) => {

  Category.find({}, (err, items) => {
    if (err)
      next({
        log: `Express error handler caught getCatalog error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.catalog = items;
      next();
    }
  });
};

//middleware to find category info of an item
mainController.getItemID = (req, res, next) => {

  Category.findOne(
    { name: req.body.itemSelected, brand: req.body.brandSelected },
    (err, items) => {
      if (err)
        next({
          log: `Express error handler caught getItemID error ${err}`,
          status: 400,
          message: { err: `${err}` }
        });
      else {
        res.locals.item = items;
        next();
      }
    }
  );
};

//middleware to get location info from ID
mainController.getLocationID = (req, res, next) => {

  Location.findOne({ _id: req.body.locationID }, (err, location) => {
    if (err)
      next({
        log: `Express error handler caught getLocationID error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.location = location;
      next();
    }
  });
};


mainController.getItemSingle = (req, res, next) => {

  Item.findOne({ _id: req.query.id }, (err, item) => {
    if (err)
      next({
        log: `Express error handler caught getLocationID error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.item = item;
      next();
    }
  });
};


//middleware to create item document
mainController.addItem = (req, res, next) => {

  const body = {
    item_name: req.body.itemSelected,
    item_id: res.locals.item._id,
    brand: req.body.brandSelected,
    expiration: req.body.date,
    mass: req.body.mass,
    mass_unit: req.body.massUnit,
    volume: req.body.volume,
    volume_unit: req.body.volumeUnit,
    location_name: res.locals.location.type + ' ' + res.locals.location.number,
    location_id: req.body.locationID,
    last_checked: Date.now(),
    username: 'default',
    user_id: 00000
  };

  Item.create(body, err => {
    if (err)
      next({
        log: `Express error handler caught addItem error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.body = body;
      next();
    }
  });
};

mainController.deleteItem = (req, res, next) => {
  Item.deleteOne({ _id: req.body.id }, (err) => {
    if (err)
      next({
        log: `Express error handler caught deleteItem error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      next();
    }
  });
};


module.exports = mainController;
