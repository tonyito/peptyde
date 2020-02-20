const models = require('../models/peptydeModels');

const mainController = {};

const { Item, Category, Location, User } = models;

//middleware to get all locations
mainController.getLocations = (req, res, next) => {

  Location.find({}, (err, location) => {
    if (err)
      return next({
        log: `Express error handler caught getLocations error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.locations = location;
      return next();
    }
  });
};

//middleware to list all items in a location 
mainController.getItems = (req, res, next) => {

  Item.find({ location_id: req.query.id }, (err, item) => {
    if (err)
      return next({
        log: `Express error handler caught getItems error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.items = item;
      return next();
    }
  });
};

//middleware to get all categories
mainController.getCatalog = (req, res, next) => {

  Category.find({}, (err, items) => {
    if (err)
      return next({
        log: `Express error handler caught getCatalog error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.catalog = items;
      return next();
    }
  });
};

//middleware to find category info of an item
mainController.getItemID = (req, res, next) => {

  Category.findOne(
    { name: req.body.itemSelected, brand: req.body.brandSelected },
    (err, items) => {
      if (err)
        return next({
          log: `Express error handler caught getItemID error ${err}`,
          status: 400,
          message: { err: `${err}` }
        });
      else {
        res.locals.item = items;
        return next();
      }
    }
  );
};

//middleware to get location info from ID
mainController.getLocationID = (req, res, next) => {

  Location.findOne({ _id: req.body.locationID }, (err, location) => {
    if (err)
      return next({
        log: `Express error handler caught getLocationID error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.location = location;
      return next();
    }
  });
};


mainController.getItemSingle = (req, res, next) => {

  Item.findOne({ _id: req.query.id }, (err, item) => {
    if (err)
      return next({
        log: `Express error handler caught getLocationID error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.item = item;
      return next();
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
      return next({
        log: `Express error handler caught addItem error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      res.locals.body = body;
      return next();
    }
  });
};

mainController.deleteItem = (req, res, next) => {
  Item.deleteOne({ _id: req.body.id }, (err) => {
    if (err)
      return next({
        log: `Express error handler caught deleteItem error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      return next();
    }
  });
};

mainController.updateItem = (req, res, next) => {
  const body = {
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
  Item.findOneAndUpdate({ _id: req.body.id }, body, (err) => {
    if (err)
      return next({
        log: `Express error handler caught updateItem error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    else {
      return next();
    }
  });
};

mainController.addCatalog = (req, res, next) => {
  const body = {
    name: req.body.name,
    brand: req.body.brand,
    catalog_number: req.body.catalog
  }

  Category.create(body, err => {
    if (err) {
      return next({
        log: `Express error handler caught addCatalog error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    }
    else {
      return next();
    }
  });
}

mainController.search = (req, res, next) => {
console.log(req.query.words);
  Item.find({item_name: req.query.words}, (err, result) => {
    if (err) {
      return next({
        log: `Express error handler caught addCatalog error ${err}`,
        status: 400,
        message: { err: `${err}` }
      });
    }
    else {
      res.locals.words = result;
      return next();
    }
  });
}


module.exports = mainController;
