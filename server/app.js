var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./models/db.js");
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');
var album = require('./routes/album');
var urlencodedParser = bodyParser.urlencoded(); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(function (req,res,next) {
  if(req.cookies.userName){
    next();
  }else{
    console.log("url:"+req.originalUrl);
    if(req.originalUrl.indexOf('/article/update')>-1 || req.originalUrl.indexOf('/article/del')>-1 || req.originalUrl=="/article/add"){
      res.json({
        status:'10001',
        msg:'当前未登录',
        result:''
      });
    }else{
      next();
    }
  }
});


app.use('/', index);
app.use('/user', users);
app.use('/article', article);
app.use('/albumList', urlencodedParser,album);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
