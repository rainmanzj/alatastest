'use strict';

var Sequelize = require('sequelize');

//��ʼ����ǰ���ݿ���Ϣ
exports.init = function () {

    var sequelize = new Sequelize('cdolute','test', 'test',
        {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            logging: console.log
        }
    );

    //��ʼ���û���
    var User = sequelize.import('../models/user.js');
    //����Ա�û�
    var Manager = sequelize.import('../models/manager.js');
    //��ǰ����Ŀ��Ϣ
    var Project = sequelize.import('../models/project.js');
    //��ʼ���û���Ϣ��
    var UserInfo = sequelize.import('../models/userInfo.js');
    //�û��Ľ�ɫ��
    var Role = sequelize.import('../models/role.js');

    // ����ģ��֮��Ĺ�ϵ
    User.hasOne(UserInfo);
    User.hasOne(Role);

    // �Ƴ�����
    sequelize.sync();

    exports.Sequelize = sequelize;
    exports.User = User;
    exports.Manager = Manager;
    exports.UserInfo = UserInfo;
    exports.Role = Role;
    exports.Project = Project;
}
