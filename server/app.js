const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const setHeaders = require("./headers");
const verifyUser = require("./middleware/bounce-user");
const d = require("./middleware/debug");

const indexRouter = require("./routes/index");
const visitorsRouter = require("./routes/visitors");
const usersRouter = require("./routes/users");

const app = express();

//app.use(helmet());
app.use(setHeaders);
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
app.use(express.json({ limit: "1mb", extended: true }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(cookieParser());
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// });
app.use("/images", verifyUser, express.static("server/images"));
app.use(express.static(path.join(__dirname, "../dist/riti")));
app.use("/users", usersRouter);
app.use("/visitors", d, verifyUser, visitorsRouter);
app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
