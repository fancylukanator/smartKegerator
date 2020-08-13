const db = require("../models");
const Tap = db.tap;

// Create and Save
exports.create = (req, res) => {
  // Validate request
  if (!req.body.beer) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tap = new Tap({
    tapNumber: req.body.tapNumber,
    brewery: req.body.brewery,
    beer: req.body.beer,
    description: req.body.description,
    abv: req.body.abv,
    initialVolume: req.body.initialVolume,
    remainingVolume: req.body.remainingVolume,
    price: req.body.price,
    inUse: req.body.inUse ? req.body.inUse : false
  });

  // Save Tutorial in the database
  tap
    .save(tap)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tap."
      });
    });
};

// Retrieve all
exports.findAll = (req, res) => {
    const beer = req.query.beer;
    var condition = beer ? { beer: { $regex: new RegExp(beer), $options: "i" } } : {};
  
    Tap.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Taps."
        });
      });
};

// Find a single
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tap.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tap with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tap with id=" + id });
      });
};

// Update
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Tap.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tap with id=${id}.`
            });
          } else res.send({ message: "Tap was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tap with id=" + id
          });
        });
};

// Delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Tap.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tap with id=${id}.`
          });
        } else {
          res.send({
            message: "Tap was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tap with id=" + id
        });
      });  
};

// Delete all
exports.deleteAll = (req, res) => {
    Tap.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Taps were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all taps."
      });
    });  
};

// Find all inUse
exports.findAllinUse = (req, res) => {
    Tap.find({ inUse: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taps."
      });
    });  
};

// Find left tap in use
exports.findLeft = (req, res) => {
  Tap.find({ inUse: true, tapNumber: 1})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while left tap."
    });
  });  
};

// Find right tap in use
exports.findRight = (req, res) => {
  Tap.find({ inUse: true, tapNumber: 2})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while left tap."
    });
  });  
};