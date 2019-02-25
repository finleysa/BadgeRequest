const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  _id: { type: String, required: true }
});

module.exports = mongoose.model("User", usersSchema);
