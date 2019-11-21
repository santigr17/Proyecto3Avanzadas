"use strict";
module.exports = function(app) {
  var market = require("../controllers/marketController");
  var product = require("../controllers/productController");
  var client = require("../controllers/clientController");
  var order = require("../controllers/orderController");
  var employee = require("../controllers/employeeController");

  //   MARKET routes
  app.route("/markets/").get(market.all_markets);

  app.route("/market/").post(market.create_new);

  app
    .route("/market/:code")
    .get(market.get_data)
    .put(market.update)
    .delete(market.delete);
};
