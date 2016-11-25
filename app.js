/* global BasicStrategy */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var app = express();
var config = require('./config'),
    admin_creds = config.admin_creds;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new BasicStrategy(
  function(username, password, done) {
      if(username === admin_creds.username && password === admin_creds.passwd)
        return done(null, true);
      else
        return done(null, false);
  }
));

var routes = require('./routes/index');
var groups = require('./routes/groups');
var games = require('./routes/games');

app.use('/', routes);
app.use('/api/games', games);
app.use('/api/admin/groups',passport.authenticate('basic', { session: false }), groups);

//Questions NOT USED ANYMORE!
var questions = require('./routes/questions');
app.use('/questions', questions);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
