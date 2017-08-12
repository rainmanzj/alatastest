'use strict';

/*
 * 模块，用于构建当前用户的登陆
 */

// const mongoose = require('mongoose');
// const local = require('./passport/local');

// const User = mongoose.model('User');

/**
 * 输出当前的构建方法，构造函数
 */

module.exports = function (passport) {

  // serialize and deserialize sessions
  // passport.serializeUser((user, done) => done(null, user.id));
  // passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // // use these strategies
  // passport.use(local);
};
