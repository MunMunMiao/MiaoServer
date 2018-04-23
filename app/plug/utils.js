const utils = {
    dbQuery: function( query, value, config ) {
        return new Promise((resolve, reject) => {


            // 检测query值是否村存在
            if( query == '' || query == undefined ){
                reject('query值不能为空')
                return false;
            }
            // 检测是不是字符串
            if( typeof (query) != 'string' ){
                reject('query值必须为字符串')
                return false;
            }

            const mysql = require('mysql');
            let connection;

            // 支持自行输入配置
            // 检测config值是否存在
            // 如果config值不存在则适用config.js里的配置,存在的话使用上面的config值
            if ( typeof (config) == 'undefined'  ){

                connection = mysql.createConnection(
                    global.userConfig.mysql
                );

            }else {

                connection = mysql.createConnection(
                    config
                );

            }

            // 连接
            connection.connect();
            // 查询
            connection.query(query, value, (error, results) => {

                if(error){

                    reject(error)
                    return false

                }

                let toJson = JSON.stringify(results)
                let toObject = JSON.parse(toJson)

                resolve( toObject )
            });

            // 结束连接
            connection.end()



        })
    },
    db: function (config) {

        let host = userConfig.mysql.host
        let port = userConfig.mysql.port
        let user = userConfig.mysql.user
        let password = userConfig.mysql.password
        let database = userConfig.mysql.database

        if ( config !== undefined ){
            host = config.host
            port = config.port
            user = config.user
            password = config.password
            database = config.database
        }

        const sequelize = require('sequelize');
        return new sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: 'mysql',
            operatorsAliases: false,
            logging: userConfig.mysql.log,
            pool: {
                max: 6,
                min: 0,
                acquire: 50000,
                idle: 10000
            },
            define: {
                createdAt: false,
                updatedAt: false,
                underscored: false,
                freezeTableName: true,
                charset: 'utf8',
                dialectOptions: {
                    collate: 'utf8_general_ci'
                },
                timestamps: false,
                version: false
            },
            query:{
                raw: true
            }
        })

    },
    send: function(status, message, data, convert) {
        status = status === null ? false : status
        message = message === null ? false : message
        data = data === null ? false : data

        let wait = {
            status:status
        }

        if ( message !== false && message !== '' && message !== undefined ){
            wait['message'] = message
        }

        if ( data !== false && data !== '' && data !== undefined){
            wait['content'] = data
        }

        if ( convert === true ){
            return JSON.stringify(wait)
        }

        if ( convert === false ){
            return wait
        }
    },
    getTypeName: filename => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    },
    getName: name => {
        let a = name.replace(/(.+)[\\/]/, "");
        let b = a.replace(/\.\w+$/, "");
        return b;
    }
}
module.exports = utils