'use strict';

const home = require('../app/controllers/home');
const register = require('../app/controllers/register');

module.exports = function (app, passport) {

    app.get('/index', home.index);
    app.get('/getdata', home.getdata);
    app.get('/getuser', home.getuser);
    app.get('/register', register.add);

    app.use(function (err, req, res, next) {
        if (err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        res.status(500).render('500', { error: err.stack });
    });

    app.use(function (req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};
