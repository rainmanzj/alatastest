'use strict';

var Sequelize = require('sequelize');

//ï¿½ï¿½Ê¼ï¿½ï¿½ï¿½ï¿½Ç°ï¿½ï¿½ï¿½Ý¿ï¿½ï¿½ï¿½Ï¢
exports.init = function () {

    var sequelize = new Sequelize('cdolute','test', 'test',
        {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            logging: console.log
        }
    );

    //ï¿½ï¿½Ê¼ï¿½ï¿½ï¿½Ã»ï¿½ï¿½ï¿½
    var User = sequelize.import('../models/user.js');
    //¹ÜÀíÔ±ÓÃ»§
    var Manager = sequelize.import('../models/manager.js');
    //µ±Ç°µÄÏîÄ¿ÐÅÏ¢
    var Project = sequelize.import('../models/project.js');
    //ï¿½ï¿½Ê¼ï¿½ï¿½ï¿½Ã»ï¿½ï¿½ï¿½Ï¢ï¿½ï¿½
    var UserInfo = sequelize.import('../models/userInfo.js');
    //ï¿½Ã»ï¿½ï¿½Ä½ï¿½É«ï¿½ï¿½
    var Role = sequelize.import('../models/role.js');

    // ½¨Á¢Ä£ÐÍÖ®¼äµÄ¹ØÏµ
    User.hasOne(UserInfo);
    User.hasOne(Role);

    // ÒÆ³ý¹¹½¨
    sequelize.sync();

    exports.Sequelize = sequelize;
    exports.User = User;
    exports.Manager = Manager;
    exports.UserInfo = UserInfo;
    exports.Role = Role;
    exports.Project = Project;
}
