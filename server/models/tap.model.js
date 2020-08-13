const mongoose = require("mongoose");

const Tap = mongoose.model(
  "Tap",
  new mongoose.Schema({
    tapNumber: {type:Number}, // 1 or 2
    brewery: {type:String},
    beer:  {type:String},
    description:  {type:String},
    abv: {type:String},
    initialVolume: {type:Number},
    remainingVolume: {type:Number},
    price:  {type:Number},
    inUse: {type:Boolean},
    logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}]
  })
);

module.exports = Tap;