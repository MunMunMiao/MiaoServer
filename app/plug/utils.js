const utils = {
    dbQuery: ( query, value, config ) => {
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