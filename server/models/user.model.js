const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    balance: {type: Number, default: '0'},
    totalVolume: {type: Number, default: '0'},
    lastActive: {type: Date},
    dayVolume: {type: Number, default: '0'},
    weekVolume: {type: Number, default: '0'},
    monthVolume: {type: Number, default: '0'}
  })
);

module.exports = User;