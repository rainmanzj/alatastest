
/**
 * ���ģ��
 */

//expressģ��
var express = require('express');
//����session
var session = require('express-session');
//������ǰ��ѹ��ģ��
var compression = require('compression');
//��־�м��
var morgan = require('morgan');
//cookie�м��
var cookieParser = require('cookie-parser');
//session�м��
var cookieSession = require('cookie-session');
//����ת���м��
var bodyParser = require('body-parser');
//������д�м��
var methodOverride = require('method-override');

//���������м��
var csrf = require('csurf');
//mongo�����м��
var mongoStore = require('connect-mongo')(session);
//һ������Ϣ�洢�м��
var flash = require('connect-flash');
//��־�м��
var winston = require('winston');

var helpers = require('view-helpers');
//ejsģ��
var ejs = require('ejs');

var config = require('./');

var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**���캯������ǰ��������*/
module.exports = function (app, passport) {

    // ������ǰ�����ѹ��
    app.use(compression({
        threshold: 512
    }));

    // ���õ�ǰ�ľ�̬·��
    app.use(express.static(config.root + '/public'));

    // ʹ����־���
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

    // �����־��Ϣ
    if (env !== 'test') app.use(morgan(log));

    // ������ͼģ������
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');

    // ���õ�ǰ���ļ��ͻ�����Ϣ
    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    // ����Urlת��
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //����JSONת��
    app.use(bodyParser.json());

    //���з�������
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // Post������ȡ
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    //Ӧ�õ�ǰ��cookie�м��
    app.use(cookieParser());
    //����session
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

    //���õ�ǰ�ĵ�½
    app.use(passport.initialize());
    app.use(passport.session());

    // ����flash�洢��
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));

    //����CSRF����
    if (process.env.NODE_ENV !== 'test') {
        app.use(csrf());

        app.use(function (req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }
};
