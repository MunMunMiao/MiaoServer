const utils = {
    db: config => {

        let host = userConfig.mysql.host
        let port = userConfig.mysql.port
        let user = userConfig.mysql.user
        let password = userConfig.mysql.password
        let database = userConfig.mysql.database

        if ( typeof config === 'object' ){
            host = config.host || userConfig.mysql.host
            port = config.port || userConfig.mysql.port
            user = config.user || userConfig.mysql.user
            password = config.password || userConfig.mysql.password
            database = config.database || userConfig.mysql.database
        }

        const sequelize = require('sequelize');
        return new sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: 'mysql',
            operatorsAliases: false,
            logging: userConfig.mysql.log,
            pool: {
                max: 18,
                min: 0,
                acquire: 100000,
                idle: 10000
            },
            define: {
                createdAt: false,
                updatedAt: false,
                underscored: false,
                freezeTableName: true,
                charset: 'utf8',
                dialectOptions: {
                    charset: 'utf8_general_ci'
                },
                timestamps: false,
                version: false
            },
            query:{
                raw: true
            }
        })

    },
    send: (status, message, data, convert) => {
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
    getDateYYYYMMDD(){

        let time = new Date()

        let year = time.getFullYear()
        let month = time.getMonth()
        let day = time.getDate()

        month = month < 10 ? '0' + ++month : ++month
        day = day < 10 ? '0' + day : day

        return year + month + day

    },
    getDateHHMMSS(date){

        let time = new Date(date)
        let hh = time.getHours()
        let mm = time.getMinutes()
        let ss = time.getSeconds()

        hh = hh < 10 ? '0' + hh : hh
        mm = mm < 10 ? '0' + mm : mm
        ss = ss < 10 ? '0' + ss : ss

        return hh + ':' + mm + ':' + ss

    },
}
module.exports = utils