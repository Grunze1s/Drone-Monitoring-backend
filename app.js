var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport'); // A middleware for authentication of users.
var authenticate = require('./authenticate'); // authentication strategy defined.

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var missionRouter = require('./routes/missionRouter');

var mongoose = require('mongoose'); // Mongoose to interact with mongodb database
var mongoose_init = require('./models/db'); // Initialiation/connection with mongodb database

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize()); // Initialize passport to use as a middleware.

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mission', missionRouter);

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
  // res.render('error');
  // json error response
  res.json({
    status: false,
    message: err.message
  });
});

module.exports = app;
