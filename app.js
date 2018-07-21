var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api.route');


var bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://tester1:tester1@ds145981.mlab.com:45981/heroku-mean-todoapp", 
  { useNewUrlParser: true}
)
.then(() => { 
  console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/heroku-mean-todoapp`);
})
.catch((err)=> { 
  console.log(err);
  console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/heroku-mean-todoapp`);
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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
