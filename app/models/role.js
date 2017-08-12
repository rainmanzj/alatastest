module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Role', {
        roleid: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
        rolename: { type: DataTypes.STRING, allowNull: false, comment: '角色名称' },
        description: { type: DataTypes.STRING, allowNum: false, comment: '描述信息' }
    },
        {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'role',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
}