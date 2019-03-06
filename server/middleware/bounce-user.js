const jwt = require("jsonwebtoken");
const fs = require("fs");
const cert = fs.readFileSync(__dirname + "/../.private.key");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.split(" ")[1];
    jwt.verify(token, cert);
    next();
  } catch (e) {
    res.status(401).json({ message: "Auth Failed!" });
  }
};
