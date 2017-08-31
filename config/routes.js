'use strict';

var express = require('express');
var router = express.Router();
const db = require("../app/db/");
//db.init();
//
const config = require('../config.json')
const wechat = require('../wechat/wechat');
//
var wechatApp = new wechat(config); 

const home = require('../app/controllers/home');
const test = require('../app/controllers/test');

var webchatTest = new test(db);
const login = require('../app/controllers/login');
const weixinserver = require('../wechat/weixin');
//
var http = require('http');
//
var admin = require('../app/controllers/manager');


function getopenid(req, res, next) {
    req.session.openid = req.query.openid;
    next();
}

module.exports = function (app) {
    db.init();
    app.get('/testgetserver', function (req, res) {
        home.testgetserver(req, res);
    });
    //
    app.get('/wx', function (req, res) {
        wechatApp.auth(req, res);
    });

    //
    app.post('/wx', function (req, res) {
        wechatApp.handleMsg(req, res);
    });

    //
    app.get('/getAccessToken', function (req, res) {
        wechatApp.getAccessToken().then(function (data) {
            res.send(data);
        });
    });

    //
    app.get("/admin/show", function (req, res, next) {
        //
        db.User.findAll().then(function (users) {
            res.render('manager/userlist.ejs', { users: users });
        });
    });
    app.get("/admin/edit", function (req, res, next) {
        //
        db.User.findAll().success(function (users) {
            res.render('home/userlist.ejs', { users: users });

        });
    });
    app.get("/admin/delete", function (req, res, next) {
        //
        var userid = req.query.userid;

        //
        db.User.destroy({ where: { userid: userid } }).then(function (rowDeleted) {
            if (rowDeleted === 0) {
                res.redirect("/admin/show");
            } else {
                res.write("111");
                res.end();
            }

        })

    });

    app.get('/wx/test', getopenid, function (req, res, next) {


        webchatTest.add(req.session.openid);
    });

    app.get('/wx/marketingregister', weixinserver.userinfo, function (req, res, next) {
        
                var weixin = req.session.weixin;
        
                console.log("get1", weixin);
        
                db.User.findOne({
                    where: {
                        openid: weixin.openid
                    }
                }).then(function (result) {
                    if (result) {
                        req.session.user = result;
                    } 
                    res.redirect("/index.html");
                });
        
            });


    app.get('/wx/userinfo', weixinserver.userinfo, function (req, res, next) {

        var weixin = req.session.weixin;

        console.log("get1", weixin);

        db.User.findOne({
            where: {
                openid: weixin.openid
            }
        }).then(function (result) {
            if (result) {
                //
                req.session.user = result;

                if (result.mobile) {
                    res.redirect('/user');
                } else {
                    console.log("find a person bu no register");
                    if (result.roleid == 0) {
                        res.redirect("/register.html");
                    } else {
                        res.redirect("/SaleRegister.html");
                    }
             
                }
          
            } else {
                console.log("find no person");
                res.redirect("/register.html");
            }
        });

    });
    //
    app.get('/user', function (req, res, next) {
        var user = req.session.user;
  
        if (user != null) {
            db.User.findOne({
                where: {
                    openid: user.openid
                }
            }).then(function (result) {
                if (result.roleid == 0) {
                    res.redirect("/registerEnd.html");
                } else {
                    res.render('home/salesperson.ejs', { user: result });
                }
            });
        } else {
            res.redirect("/register.html");
        }
    });

    //
    app.get('/user/my', function (req, res, next) {
        var user = req.session.user;

        if (user != undefined) {

            db.Sequelize.query("select * from user as u1  join userinfo as u2 on u1.userid=u2.user_userid where userid=" + user.userid).then(function (fuser) {

                var userf = fuser[0][0];

                db.Sequelize.query("select * from user as u1  join userinfo as u2 on u1.userid = u2.user_userid where u1.sponsor="+user.userid).then(function (sponsors) {

                    res.render('home/user.ejs', { user: userf, sponsors: sponsors[0]});

                });


            });
       
       
        } else {

          res.redirect("/register.html");
        }

    });
    //
    app.get('/user/orcode', function (req, res, next) {

        var user = req.session.user;
        
        if (user != undefined) {
            console.log("jj:"+user.userid);
            http.get('http://www.faruxue1688.com/wx/qrcode?scenid=' + user.userid, function (result) {
                console.log("imgreq:"+'http://www.faruxue1688.com/wx/qrcode?scenid=' + user.userid);
                var html = '';
                result.on('data', function (data) {
                    console.log("imgurl:"+data);
                    html += data;
                    
                    res.render('home/orcode.ejs', { res: html });
                });
                result.on('end', function (html) {
                    console.info("creare or code");
                });
            });
        } else {
            http.get('http://www.faruxue1688.com/wx/qrcode?scenid=11', function (result) {

                var html = '';
                result.on('data', function (data) {
                    html += data;

                    res.render('home/orcode.ejs', { res: html });
                });
                result.on('end', function (html) {
                    console.info("creare or code");
                });
   
            });
        }
    });

    app.get('/wx/qrcode', weixinserver.qrcode);

    app.post('/login', function (req, res, next) {

        next();
    });

    app.post('/register', function (req, res, next) {
        var username = req.body.username;
        var address = req.body.address;
        var mobile = req.body.mobile;
        var code = req.body.code;
        var weixin = req.session.weixin;
        var user = null;
        var userinfo = null;
       
        if (weixin) {

    
            user = {
                mobile: mobile,
                openid: weixin.openid,
                active: true,
            };
     
            db.User.findOne({
                where: {
                    openid: weixin.openid
                }
            }).then(function (result) {
                if (result != null) {


                    if (result.mobile!=null&&result.mobile != "") {
                        var cuser = result;
                        req.session.user = cuser;
                        res.redirect('/user');
                    } else {

              
    
                    userinfo = {
                        username: username,
                        address: address,
                        user_userid: result.userid
                    };
                    Promise.all([
                        db.User.update(user, { where: { openid: weixin.openid} }),
                        db.UserInfo.create(userinfo)
                    ]).then(function (udata) {
                        var user = result;
                        req.session.user = user;
                        console.log("create success and go to registerEnd");
                        res.redirect('/user');
                        });

                    }
                };
                });

  
        } else {
            user = {
                mobile: mobile,
                active: true,
            };
            userinfo = {
                username: username,
                address: address,
            };

            Promise.all([
                db.User.create(user),
                db.UserInfo.create(userinfo),
            ]).then(function (result) {
                var user = result[0];
                req.session.user = user;
                console.log("create success and go to registerEnd");
                res.redirect('/user');
            }).catch(function (e) {
                return res.redirect('/register.html');
                next(e);
            });
        }

   

    });

    app.use('/manager',require("../app/controllers/manager"));

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
