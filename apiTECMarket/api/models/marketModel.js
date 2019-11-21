var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarketSchema = new Schema({
  Code: Number,
  Name: String,
  Latitude: String,
  Longitude: String,
  Address: String,
  Description: String
});

module.exports = mongoose.model("Market", MarketSchema);
