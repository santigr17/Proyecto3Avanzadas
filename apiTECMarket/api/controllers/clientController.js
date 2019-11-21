var mongoose = require("mongoose");
client = mongoose.model("Client");

exports.all_clients = function(req, res) {
  client.find({}, { _id: 0, __v: 0 }, function(error, clients) {
    if (error) res.send(error);
    res.json(clients);
  });
};

exports.create_new = function(req, res) {
  var new_port = new client(req.body);
  new_port.save(function(error, client) {
    if (error) res.send(error);
    res.json(client);
  });
};

exports.get_data = function(req, res) {
  client.find({ Identification: req.params.id }, { _id: 0, __v: 0 }, function(
    error,
    client
  ) {
    if (error) res.send(error);
    res.json(client);
  });
};

exports.update = function(req, res) {
  client.findOneAndUpdate(
    { Identification: req.params.id },
    req.body,
    { new: true },
    function(err, client) {
      if (err) res.send(err);
      res.json(client);
    }
  );
};

exports.delete = function(req, res) {
  client.remove({ Identification: req.params.id }, function(err, client) {
    if (err) res.send(err);
    res.json({ message: "Client deleted, succesfully" });
  });
};
