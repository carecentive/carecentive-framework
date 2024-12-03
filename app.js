// app.js
var setup = require("./source/setup");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var httplogger = require("morgan");
/*
May be required for Garmin
var cors = require("cors");
var session = require("express-session");*/

setup.setup();

var usersRouter = require('@carecentive/carecentive-core/routes/users');
var questionnaireRouter = require('@carecentive/carecentive-core/routes/questionnaires');
var measurementRouter = require('@carecentive/carecentive-core/routes/measurements');
var fileRouter = require('@carecentive/carecentive-core/routes/files');
var callbackRouter = require('@carecentive/carecentive-core/routes/callback');
var withingsRouter = require('@carecentive/carecentive-core/routes/settings');
var fitbitRouter = require('@carecentive/carecentive-core/routes/fitbit');
var analyticsRouter = require('@carecentive/carecentive-core/routes/analytics');
var settingsRouter = require('@carecentive/carecentive-core/routes/settings');
var garminAuthRouter = require('@carecentive/carecentive-core/routes/GarminAuthRoutes');
var garminRouter = require("./routes/GarminRoutes");
var sensorsRouter = require('@carecentive/carecentive-core/routes/sensors');

//Google Fitness Router
var googleFitnessRouter = require("@carecentive/carecentive-core/routes/googleFitness");

//Importing cron-job to initiate auto syncing of daily fitness data from Google Fitness API
const dailyUpdate = require("./services/DailyFitnessService");

var adminUsersRouter = require("@carecentive/carecentive-core/routes/admin/users");
var adminMeasurementsRouter = require("@carecentive/carecentive-core/routes/admin/measurements");

var activityRouter = require("./routes/activities");
var exampleRouter = require("./routes/examples");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Initialize ORM
 * Do not delete this line.
 */

require("@carecentive/carecentive-core/models/ORM");

/**
 * Set up routes
 */
app.use(httplogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// May be required for Garmin
/*app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your Vue app's URL
  credentials: true
}));

app.use(session({
  secret: 'your_secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));*/

app.use(express.static(path.join(__dirname, "public")));

require("@carecentive/carecentive-core/models/ORM");
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/admin/users', adminUsersRouter);
app.use('/api/admin/measurements', adminMeasurementsRouter);
app.use('/api/withings', withingsRouter);
app.use('/api/fitbit', fitbitRouter);
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
app.use("/api/sensors", sensorsRouter);
app.use("/api/examples", exampleRouter);

/**
 * Router for Google Fitness API
 */
app.use("/api/google-fit", googleFitnessRouter);

/**
 * Custom routes
 */
app.use("/api/activities", activityRouter);
app.use("/api/examples", exampleRouter);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
