var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  Code: Number,
  Market:Number, // Agregado Nuevo
  Client:Number, // Agregado Nuevo
  Product: Array,
  Quantity: Array,
  Price: Array,
  DateTime: Date,
  State: String,
  Notes: String
});

module.exports = mongoose.model("Order", OrderSchema);
