var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  Identification: Number,
  Name: String,
  Username: String,
  Password: String,
  MarketCode: Number
});

module.exports = mongoose.model("Employee", EmployeeSchema);
