var mongoose = require("mongoose");
product = mongoose.model("Product");

exports.all_products = function(req, res) {
  product.find({}, { _id: 0, __v: 0 }, function(error, products) {
    if (error) res.send(error);
    res.json(products);
  });
};

exports.create_new = function(req, res) {
  var new_port = new product(req.body);
  new_port.save(function(error, product) {
    if (error) res.send(error);
    res.json(product);
  });
};

exports.get_data = function(req, res) {
  product.find({ Code: req.params.code }, { _id: 0, __v: 0 }, function(
    error,
    product
  ) {
    if (error) res.send(error);
    res.json(product);
  });
};

exports.update = function(req, res) {
  product.findOneAndUpdate(
    { Code: req.params.code },
    req.body,
    { new: true },
    function(err, product) {
      if (err) res.send(err);
      res.json(product);
    }
  );
};

exports.delete = function(req, res) {
  product.remove({ Codigo: req.params.codigo }, function(err, product) {
    if (err) res.send(err);
    res.json({ message: "Product deleted, succesfully" });
  });
};
