module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserInfo', {
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '用户的真实名称'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '用户的地址信息'
        },
        lastactivity: {
            type: DataTypes.DATE, 
            allowNull: true,
            comment: '最后登陆的时间'
        },
        mail: {
            field: 'mail',
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            field: 'gender',
            type: DataTypes.ENUM('MALE', 'FEMALE'),
            allowNull: true
        },
        birth: {
            field: 'birth',
            type: DataTypes.DATE,
            allowNull: true
        }, 
        userIcon: {
            field: 'user_icon',
            type: DataTypes.STRING,
            allowNull: true
        },

    },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'userinfo',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
}