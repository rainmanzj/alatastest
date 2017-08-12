
/**
 * 框架模块
 */

//express模块
var express = require('express');
//设置session
var session = require('express-session');
//构建当前的压缩模块
var compression = require('compression');
//日志中间件
var morgan = require('morgan');
//cookie中间件
var cookieParser = require('cookie-parser');
//session中间件
var cookieSession = require('cookie-session');
//数据转换中间件
var bodyParser = require('body-parser');
//方法重写中间件
var methodOverride = require('method-override');

//跨域请求中间件
var csrf = require('csurf');
//mongo连接中间件
var mongoStore = require('connect-mongo')(session);
//一次性消息存储中间件
var flash = require('connect-flash');
//日志中间件
var winston = require('winston');

var helpers = require('view-helpers');
//ejs模块
var ejs = require('ejs');

var config = require('./');

var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**构造函数，当前程序的输出*/
module.exports = function (app, passport) {

    // 启动当前程序的压缩
    app.use(compression({
        threshold: 512
    }));

    // 设置当前的静态路径
    app.use(express.static(config.root + '/public'));

    // 使用日志框架
    var log;
    if (env !== 'development') {
        log = {
            stream: {
                write: function (message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = 'dev';
    }

    // 添加日志信息
    if (env !== 'test') app.use(morgan(log));

    // 设置视图模板引擎
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');

    // 设置当前包文件和环境信息
    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    // 进行Url转换
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //进行JSON转换
    app.use(bodyParser.json());

    //进行方法覆盖
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // Post方法获取
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    //应用当前的cookie中间件
    app.use(cookieParser());
    //设置session
    app.use(cookieSession({ secret: 'secret' }));
    // app.use(session({
    //   secret: pkg.name,
    //   proxy: true,
    //   resave: true,
    //   saveUninitialized: true,
    //   store: new mongoStore({
    //     url: config.db,
    //     collection : 'sessions'
    //   })
    // }));

    //设置当前的登陆
    app.use(passport.initialize());
    app.use(passport.session());

    // 连接flash存储区
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));

    //增加CSRF功能
    if (process.env.NODE_ENV !== 'test') {
        app.use(csrf());

        app.use(function (req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }
};
