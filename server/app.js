const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const setHeaders = require("./headers");
const verifyUser = require("./middleware/bounce-user");

const indexRouter = require("./routes/index");
const visitorsRouter = require("./routes/visitors");
const usersRouter = require("./routes/users");

const app = express();

app.use(helmet());
app.use(setHeaders);
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
app.use(express.json({ limit: "6mb", extended: true }));
app.use(express.urlencoded({ limit: "6mb", extended: true }));
app.use(cookieParser());
app.use("/images", verifyUser, express.static("server/images"));
app.use(express.static(path.join(__dirname, "../dist/riti")));
app.use("/users", usersRouter);
app.use("/visitors", verifyUser, visitorsRouter);
app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
