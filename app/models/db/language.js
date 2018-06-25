/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('language', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        keyword: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        en: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cn: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        kr: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        jp: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'language'
    });
};
