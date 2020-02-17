const models = require('../models/peptydeModels');

const mainController = {};

const { Item, Category, Location, User } = models;

mainController.getLocations = (req, res, next) => {
  // write code here
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

mainController.getItems = (req, res, next) => {
  // write code here
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

mainController.getCatalog = (req, res, next) => {
  // write code here
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

mainController.getItemID = (req, res, next) => {
  // write code here
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

mainController.getLocationID = (req, res, next) => {
  // write code here
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

mainController.addItem = (req, res, next) => {
  // write code here
  console.log(req.body);

  // const body = {
  //   item_name: req.body.itemSelected,
  //   item_id: res.locals.item._id,
  //   brand: req.body.brandSelected,
  //   expiration: req.body.date,
  //   mass: req.body.mass,
  //   mass_unit: req.body.massUnit,
  //   volume: req.body.volume,
  //   volume_unit: req.body.volume_unit,
  //   location_name: res.locals.location.name,
  //   location_id: locationID,
  //   last_checked: Date.now(),
  //   username: 'default',
  //   user_id: 00000
  // };

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

module.exports = mainController;
