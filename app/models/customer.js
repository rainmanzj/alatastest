module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Customer', {
        id: { type: DataTypes.STRING, allowNull: true, comment: '用户的id' },
        openid: { type: DataTypes.STRING, allowNull: true, comment: '用户的id' },
        relationtime: { type: DataTypes.timestamps, allowNull: false,  comment: '产生关系的时间' },
        address: { type: DataTypes.STRING, allowNull: false, comment: '产生关系的地址' },
    },
        {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'customer',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
}