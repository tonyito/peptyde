const mongoose = require("mongoose");
const secret = require('../../secrets.js')

const MONGO_URI = secret;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "peptyde"
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'items' collection
const itemSchema = new Schema({
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
  stock_date: { type: Date, default: Date.now },
  expiration: Date,
  mass: Number,
  volume: Number,
  location_id: {
    type: Schema.Types.ObjectId,
    ref: "location",
    required: true
  },
  last_checked: Date,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

// creats a model for the 'items' collection that will be part of the export
const Item = mongoose.model("items", itemSchema);

// sets a schema for the 'categories' collection
const categorySchema = new Schema({
  name: String,
  state: String,
  brand: String,
  catalog_number: String
});

// creats a model for the 'categories' collection that will be part of the export
const Category = mongoose.model("categories", categorySchema);

const locationSchema = new Schema({
  type: { type: String, required: true },
  number: { type: Number, required: true },
  row: { type: Number}
});

const Location = mongoose.model("locations", locationSchema);

const userSchema = new Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    privileges: { type: String, required: true }
  });
  
  const User = mongoose.model("users", userSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  Item,
  Category,
  Location,
  User
};
