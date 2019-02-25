const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost/riti";

exports.connect = () => {
  mongoose
    .connect(
      mongoUrl,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });
};
