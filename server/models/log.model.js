const mongoose = require("mongoose");

const Log = mongoose.model(
  "Log",
  new mongoose.Schema({
    user: {type:String},
    tap: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Tap"
    },
    volume: {type:Number},
    price: {type:Number},
    time: {type: Date, default: Date.now}

  })
);

module.exports = Log;