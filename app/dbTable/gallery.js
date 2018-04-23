/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('gallery', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        src: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        tag: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        addTime: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        survival: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'gallery'
    });
};
