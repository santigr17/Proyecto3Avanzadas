var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  Identification: Number,
  Name: String,
  Telephone: Number,
  Email: String,
  Birthday: Date,
  Username: String,
  Password: String
});

module.exports = mongoose.model("Client", ClientSchema);
