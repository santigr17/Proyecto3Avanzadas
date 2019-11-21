var cors = require("cors");
var express = require("express"),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require("mongoose"),
  market = require("./api/models/marketModel"),
  bodyParser = require("body-parser");

useStyle;

const connectionString = "mongodb://localhost/TECMarket";
mongoose.Promise = global.Promise;
mongoose.connect(connectionString).catch(error => {
  console.log(error);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require("./api/routes/tecmarketRoutes");
routes(app);

app.listen(port);

console.log("todo list RESTful API server started on: " + port);
