// app.js
var setup = require("./source/setup");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var httplogger = require("morgan");
var cors = require("cors");
var session = require("express-session");

setup.setup();

var usersRouter = require('@carecentive/carecentive-core/routes/users');
var questionnaireRouter = require('@carecentive/carecentive-core/routes/questionnaires');
var measurementRouter = require('@carecentive/carecentive-core/routes/measurements');
var fileRouter = require('@carecentive/carecentive-core/routes/files');
var callbackRouter = require('@carecentive/carecentive-core/routes/callback');
var withingsRouter = require('@carecentive/carecentive-core/routes/settings');
var analyticsRouter = require('@carecentive/carecentive-core/routes/analytics');
var settingsRouter = require('@carecentive/carecentive-core/routes/settings');
var garminAuthRouter = require('@carecentive/carecentive-core/routes/GarminAuthRoutes');
var garminRouter = require("./routes/GarminRoutes");

var adminUsersRouter = require("@carecentive/carecentive-core/routes/admin/users");
var adminMeasurementsRouter = require("@carecentive/carecentive-core/routes/admin/measurements");

var activityRouter = require("./routes/activities");
var exampleRouter = require("./routes/examples");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(httplogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your Vue app's URL
  credentials: true
}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'your_secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

require("@carecentive/carecentive-core/models/ORM");

app.use('/api/admin/users', adminUsersRouter);
app.use('/api/admin/measurements', adminMeasurementsRouter);
app.use('/api/withings', withingsRouter);
app.use('/api/users', usersRouter);
app.use('/api/callback', callbackRouter);
app.use('/api/questionnaires', questionnaireRouter);
app.use('/api/measurements', measurementRouter);
app.use('/api/files', fileRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/settings', settingsRouter);
app.use("/api", garminAuthRouter);  // Ensure the route prefix matches the path used in the request
app.use("/api/garmin", garminRouter);
app.use("/api/activities", activityRouter);
app.use("/api/examples", exampleRouter);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
