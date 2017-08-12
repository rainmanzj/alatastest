module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        id: { type: DataTypes.BIGINT, allowNull: false, comment: '用户唯一ID' },
        mobile: { type: DataTypes.STRING, allowNull: true, comment: '用户的手机号' },
        openid: { type: DataTypes.STRING, allowNull: true, comment: '用户的微信id' },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, comment: '是否正常状态' },
        roleid: { type: DataTypes.BIGINT, allowNull: false, comment: '当前用户的角色' },
    },
        {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
}