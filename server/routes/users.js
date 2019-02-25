var express = require("express");
var router = express.Router();
var user = require("../models/user");
var fs = require("fs");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

router.post("/api/login", (req, res, next) => {
  user
    .findOne({ username: req.body.username })
    .then(document => {
      bcrypt.compare(req.body.password, document.password).then(function(isGood) {
        if(isGood) {
          console.log(req.body);
          const cert = fs.readFileSync(__dirname + '/../private.key');
          const token = jwt.sign({username: document.username, _id: document._id}, cert, {expiresIn: "1h"});

          res.status(200)
            .json({message: "Successful Login", token: token});
        } else {
          return res.status(401).json({message: "Auth Failed"})
        }
      }).catch((err) => {
        console.log(err)
        res.status(401).json({message: "Auth Failed"})
      });
    });
});

module.exports = router;
