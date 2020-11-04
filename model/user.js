let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  level: String,
  turns: Number,
});

module.exports = mongoose.model("User", userSchema);
