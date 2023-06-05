var setup = require('./source/setup');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var httplogger = require('morgan');

setup.setup();

/**
 * Prepare routers
 */

var usersRouter = require('@carecentive/carecentive-core/routes/users');
var questionnaireRouter = require('@carecentive/carecentive-core/routes/questionnaires');
var measurementRouter = require('@carecentive/carecentive-core/routes/measurements');
var fileRouter = require('@carecentive/carecentive-core/routes/files');
var callbackRouter = require('@carecentive/carecentive-core/routes/callback');
var withingsRouter = require('@carecentive/carecentive-core/routes/settings');
var analyticsRouter = require('@carecentive/carecentive-core/routes/analytics');
var settingsRouter = require('@carecentive/carecentive-core/routes/settings');

var adminUsersRouter = require('@carecentive/carecentive-core/routes/admin/users');
var adminMeasurementsRouter = require('@carecentive/carecentive-core/routes/admin/measurements');

var activityRouter = require('./routes/activities');
var exampleRouter = require('./routes/examples');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Initialize ORM
 * Do not delete this line.
 */

require('@carecentive/carecentive-core/models/ORM');

/**
 * Set up routes
 */

app.use(httplogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Core routes
 */
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


/**
 * Custom routes
 */
app.use('/api/activities', activityRouter);
app.use('/api/examples', exampleRouter);


app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
