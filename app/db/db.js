'use strict';

var Sequelize = require('sequelize');

//��ʼ����ǰ���ݿ���Ϣ
exports.init = function () {

    var sequelize = Sequelize('modelTest','root', '123456',
        {
            host: 'localhost',
            port: 3306,
            logging: console.log
        }
    );

    //��ʼ���û���
    var User = sequelize.import('../models/user.js');
    //��ʼ���û���Ϣ��
    var UserInfo = sequelize.import('../models/userInfo.js');
    //�û��Ľ�ɫ��
    var Role = sequelize.import('../models/role.js');
    //��ǰ�û��Ŀͻ���
    var Customer = sequelize.import('../models/customer.js');

    // ����ģ��֮��Ĺ�ϵ
    User.hasOne(Role);
    User.belongsToMany(Role, { through: 'userRoles', as: 'UserRoles' });
    Customer.belongsToMany(User, { through: 'userCustom', as: 'CserCustom' });

    // ͬ��ģ�͵����ݿ���
    sequelize.sync();

    exports.Sequelize = sequelize;
    exports.User = User;
    exports.UserCheckin = UserCheckin;
    exports.UserAddress = UserAddress;
    exports.Role = Role;
}
