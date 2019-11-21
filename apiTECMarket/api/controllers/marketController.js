var mongoose = require("mongoose");
market = mongoose.model("Market");

exports.all_markets = function(req, res) {
  market.find({}, { _id: 0, __v: 0 }, function(error, markets) {
    if (error) res.send(error);
    res.json(markets);
  });
};

exports.create_new = function(req, res) {
  var new_port = new market(req.body);
  new_port.save(function(error, market) {
    if (error) res.send(error);
    res.json(market);
  });
};

exports.get_data = function(req, res) {
  market.find({ Code: req.params.code }, { _id: 0, __v: 0 }, function(
    error,
    market
  ) {
    if (error) res.send(error);
    res.json(market);
  });
};

exports.update = function(req, res) {
  market.findOneAndUpdate(
    { Code: req.params.code },
    req.body,
    { new: true },
    function(err, market) {
      if (err) res.send(err);
      res.json(market);
    }
  );
};

exports.delete = function(req, res) {
  market.remove({ Codigo: req.params.codigo }, function(err, market) {
    if (err) res.send(err);
    res.json({ message: "Market deleted, succesfully" });
  });
};
