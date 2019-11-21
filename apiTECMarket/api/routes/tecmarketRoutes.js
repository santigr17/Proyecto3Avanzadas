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

  //   PRODUCT routes
  app.route("/products/").get(product.all_products);

  app.route("/product/").post(product.create_new);

  app
    .route("/product/:code")
    .get(product.get_data)
    .put(product.update)
    .delete(product.delete);

  //   CLIENT routes
  app.route("/clients/").get(client.all_clients);

  app.route("/client/").post(client.create_new);

  app
    .route("/client/:id")
    .get(client.get_data)
    .put(client.update)
    .delete(client.delete);

  //   ORDER routes
  app.route("/orders/").get(order.all_orders);

  app.route("/order/").post(order.create_new);

  app
    .route("/order/:code")
    .get(order.get_data)
    .put(order.update)
    .delete(order.delete);

  //   EMPLOYEE routes
  app.route("/employees/").get(employee.all_employees);

  app.route("/employee/").post(employee.create_new);

  app
    .route("/employee/:id")
    .get(employee.get_data)
    .put(employee.update)
    .delete(employee.delete);
};
