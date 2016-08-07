/**
 * create by Piny
 *
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var argv = require("yargs").argv;

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var home = require('./routes/home');
var shop = require('./routes/shop');
// 管理后台
var admin = require("./routes/admin/admin");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
// console.log(argv.dev);
if(argv.dev){
    console.log("********************** webpack begin *****************************");
    var webpackDevMiddlewave = require("webpack-dev-middleware");
    var webpack = require("webpack");

    var config = require("./webpack.config.js");
    var compiler = webpack(config);
    app.use(webpackDevMiddlewave(compiler, {
        contentBase: __dirname + "/build/",
        hot: true,
        watchOptions:{
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {
            colors: true,
        },
        publicPath: 'js/',
        noInfo: false,
        quiet: false
    }));
    console.log("********************** webpack end *****************************");
}

app.use('/', home);
app.use('/users', users);
app.use('/login', login);
app.use('/admin', admin);
app.use('/shop', shop);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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
// user webpack-dev-server

module.exports = app;
