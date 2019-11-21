var mongoose = require("mongoose");
employee = mongoose.model("Employee");

exports.all_employees = function(res, req) {
  employee.find({}, { _id: 0, __v: 0 }, function(error, employees) {
    if (error) res.send(error);
    res.json(employees);
  });
};

exports.create_new = function(res, req) {
  var new_port = new employee(req.body);
  new_port.save(function(error, employee) {
    if (error) res.send(error);
    res.json(employee);
  });
};

exports.get_data = function(res, req) {
  employee.find({ Identification: req.params.id }, { _id: 0, __v: 0 }, function(
    error,
    employee
  ) {
    if (error) res.send(error);
    res.json(employee);
  });
};

exports.update = function(res, req) {
  employee.findOneAndUpdate(
    { Identification: req.params.id },
    req.body,
    { new: true },
    function(err, employee) {
      if (err) res.send(err);
      res.json(employee);
    }
  );
};

exports.delete = function(req, res) {
  employee.remove({ Identification: req.params.id }, function(err, employee) {
    if (err) res.send(err);
    res.json({ message: "Employee deleted, succesfully" });
  });
};
