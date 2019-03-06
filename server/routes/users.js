var express = require("express");
var router = express.Router();
var user = require("../models/user");
var fs = require("fs");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cert = fs.readFileSync(__dirname + "/../.private.key");

router.post("/api/login", (req, res, next) => {
  let fetechedUser;
  user
    .findOne({ username: req.body.username })
    .then(userDoc => {
      console.log(userDoc);
      if (!userDoc) {
        res.status(401).send({ message: "Auth Failed" });
      }
      fetechedUser = userDoc;
      return bcrypt.compare(req.body.password, userDoc.password);
    })
    .then(isGood => {
      if (!isGood) {
        return res.status(401).json({ message: "Auth Failed" });
      }
      const token = jwt.sign(
        { username: fetechedUser.username, _id: fetechedUser._id },
        cert,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Successful Login", token: token });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ message: "Auth Failed" });
    });
});

module.exports = router;
