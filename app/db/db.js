'use strict';

var Sequelize = require('sequelize');

//初始化当前数据库信息
exports.init = function () {

    var sequelize = Sequelize('modelTest','root', '123456',
        {
            host: 'localhost',
            port: 3306,
            logging: console.log
        }
    );

    //初始化用户表
    var User = sequelize.import('../models/user.js');
    //初始化用户信息表
    var UserInfo = sequelize.import('../models/userInfo.js');
    //用户的角色表
    var Role = sequelize.import('../models/role.js');
    //当前用户的客户表
    var Customer = sequelize.import('../models/customer.js');

    // 建立模型之间的关系
    User.hasOne(Role);
    User.belongsToMany(Role, { through: 'userRoles', as: 'UserRoles' });
    Customer.belongsToMany(User, { through: 'userCustom', as: 'CserCustom' });

    // 同步模型到数据库中
    sequelize.sync();

    exports.Sequelize = sequelize;
    exports.User = User;
    exports.UserCheckin = UserCheckin;
    exports.UserAddress = UserAddress;
    exports.Role = Role;
}
