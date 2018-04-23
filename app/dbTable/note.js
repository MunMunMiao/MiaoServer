/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('note', {
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
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ip: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        updataTime: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        tableName: 'note'
    });
};
