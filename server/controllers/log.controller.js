const db = require("../models");
const Log = db.log;

// Retrieve all Logs from the database.
exports.findAll = (req, res) => {
    const user = req.query.user;
    var condition = user ? { user: { $regex: new RegExp(user), $options: "i" } } : {};
  
    Log.find(condition)
    .populate({
      path: 'tap',
      select: 'brewery beer'
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving logs."
        });
      });
};

// Find a single Log with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Log.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Log with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Log with id=" + id });
      });
};