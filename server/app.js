var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var setHeaders = require("./headers");
var path = require("path");

var indexRouter = require("./routes/index");
var visitorsRouter = require("./routes/visitors");
var usersRouter = require("./routes/users");

var app = express();

app.use(helmet());
app.use(setHeaders);
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
app.use(express.json({ limit: "6mb", extended: true }));
app.use(express.urlencoded({ limit: "6mb", extended: true }));
app.use(cookieParser());
app.use("/images", express.static("server/images"), );
app.use(express.static(path.join(__dirname, "../dist/riti")));
app.use("/users", usersRouter);
app.use("/visitors", visitorsRouter);
app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
