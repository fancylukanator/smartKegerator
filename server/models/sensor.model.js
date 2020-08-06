const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema({
    AccountName: {type:String},
    Temperature:{type:Number},
    Rate1:{type:Number},
    Vol1:{type:Number},
    PourVol1:{type:Number},
    Rate2:{type:Number},
    Vol2:{type:Number},
    PourVol2:{type:Number}
  })
);

module.exports = Sensor;