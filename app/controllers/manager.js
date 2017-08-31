var express = require('express');
var login = require('./login');
var router = express.Router();
const db = require("../db/");

router.get('/login', function (req, res, next) {

    res.render('manager/login.ejs');
});
//登陆
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    db.Manager.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(function (result) {

        if (result != null) {
            req.session.user = result;
            res.redirect("/manager");
        } else {
            res.render('manager/login.ejs');
        }
        });

});

//访问管理页面
router.get('/', login.checkin, function (req, res, next) {

    db.User.findAll().then(function (result) {

        res.render('manager/index.ejs', { users: result});
    });
})

router.get('/user', login.checkin, function (req, res, next) {

    db.User.findAll().then(function (result) {

        res.render('manager/user.ejs', { users: result });
    });
})

router.get('/role', login.checkin, function (req, res, next) {

    db.Role.findAll().then(function (result) {

        res.render('manager/role.ejs', { roles: result });
    });
})

router.get('/project', login.checkin, function (req, res, next) {

    db.Project.findAll().then(function (result) {

        res.render('manager/project.ejs', { projects: result });
    });
})
module.exports = router;