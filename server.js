'use strict';

/*当前程序的主运行程序*/

//加载dotenv配置信息
require('dotenv').config();

//读取路径功能
const path = require('path');
//建立express对象
const express = require('express');
//创建登陆组件
const passport = require('passport');

//读取config.json文件
const config = require('./config.json');


//获取端口号

const port = process.env.PORT || 3000;
//启动应用程序
const app = express();

const wechat = require('./wechat/wechat');
var wechatApp = new wechat(config); //实例wechat 模块

//用于处理所有进入 3000 端口 get 的连接请求
app.get('/wx', function (req, res) {
    wechatApp.auth(req, res);
});

//用于处理所有进入 3000 端口 post 的连接请求
app.post('/wx', function (req, res) {
    wechatApp.handleMsg(req, res);
});

//用于请求获取 access_token
app.get('/getAccessToken', function (req, res) {
    wechatApp.getAccessToken().then(function (data) {
        res.send(data);
    });
});

const connection = null;
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));
/**
 * 当前的输出
 */
module.exports = {
    app,
    connection
};

//建立初始化信息
require('./config/passport.js')(passport);
require('./config/express.js')(app, passport);
require('./config/routes.js')(app, passport);

//启动监听
listen();

//监听函数
function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('当前应用程序启动,应用端口' + port);
}
