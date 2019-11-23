var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  Code: Number,
  MarketCode: Number,
  Name: String,
  Description: String,
  Price: Number
});
// Hay que agregar foto
module.exports = mongoose.model("Product", ProductSchema);
