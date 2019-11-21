var mongoose = require("mongoose");
market = mongoose.model("Market");

exports.all_markets = function(res, req) {
  market.find({}, function(error, markets) {
    if (error) res.send(error);
    res.json(markets);
  });
};

exports.create_new = function(res, req) {
  var new_port = new market(req.body);
  new_port.save(function(error, market) {
    if (error) res.send(error);
    res.json(market);
  });
};

exports.get_data = function(res, req) {
  market.find({ Code: req.params.code }, function(error, market) {
    if (error) res.send(error);
    res.json(market);
  });
};

exports.update = function(res, req) {
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
