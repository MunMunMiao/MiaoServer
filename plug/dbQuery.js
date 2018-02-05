module.exports = ( query, config ) => {

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

            const config = require(appPath + '/config');
            connection = mysql.createConnection(
                config.mysql
            );

        }else {

            connection = mysql.createConnection(
                config
            );

        }

        // 连接
        connection.connect();
        // 查询
        connection.query(query, (error, results) => {

            if(error){

                reject(error)
                return false

            }

            resolve( results )
        });

        // 结束连接
        connection.end()



    })


};