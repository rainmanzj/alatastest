module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserInfo', {
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '用户的邮箱'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '用户的真实名称'
        },
        lastactivity: {
            type: DataTypes.timestamps, 
            allowNull: true,
            comment: '最后登陆的时间'
        },
        mail: {
            field: 'mail',
            type: Sequelize.STRING,
            allowNull: true
        },
        gender: {
            field: 'gender',
            type: Sequelize.ENUM('MALE', 'FEMALE'),
            allowNull: true
        },
        birth: {
            field: 'birth',
            type: Sequelize.STRING,
            allowNull: true
        }, 
        userIcon: {
            field: 'user_icon',
            type: Sequelize.STRING,
            allowNull: true
        },

    },
        {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'userinfo',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
}