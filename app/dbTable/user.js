/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR(20),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        portrait: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gender: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        nickname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        admin: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        root: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        vip: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'user'
    });
};
