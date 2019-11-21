var mongoose = require("mongoose");
order = mongoose.model("Order");

exports.all_orders = function(req, res) {
  order.find({}, { _id: 0, __v: 0 }, function(error, orders) {
    if (error) res.send(error);
    res.json(orders);
  });
};

exports.create_new = function(req, res) {
  var new_port = new order(req.body);
  new_port.save(function(error, order) {
    if (error) res.send(error);
    res.json(order);
  });
};

exports.get_data = function(req, res) {
  order.find({ Code: req.params.code }, { _id: 0, __v: 0 }, function(
    error,
    order
  ) {
    if (error) res.send(error);
    res.json(order);
  });
};

exports.update = function(req, res) {
  order.findOneAndUpdate(
    { Code: req.params.code },
    req.body,
    { new: true },
    function(err, order) {
      if (err) res.send(err);
      res.json(order);
    }
  );
};

exports.delete = function(req, res) {
  order.remove({ Codigo: req.params.codigo }, function(err, order) {
    if (err) res.send(err);
    res.json({ message: "Order deleted, succesfully" });
  });
};
