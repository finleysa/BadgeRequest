var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("*", function(req, res) {
  res.status(200).sendFile(path.join(__dirname, "../../dist/riti/index.html"));
});
module.exports = router;
