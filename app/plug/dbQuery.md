# dbQuery.js

*简单使用*
```
dbQuery('SELECT name FROM user')
//[{'name':'Anndy'}]
```


*源码*
```
const dbQuery = function ( query,config ) {

    // 检测query值是否村存在
    if( query == '' || query == undefined ){
        console.log('query值不能为空')
        return false;
    }
    // 检测是不是字符串
    if( typeof (query) != 'string' ){
        console.log('query值必须为字符串')
        return false;
    }

    let mysql = require('mysql');
    let connection;

    // 支持自行输入配置
    // 检测config值是否存在
    // 如果config值不存在则适用config.js里的配置,存在的话使用上面的config值
    if ( typeof (config) == 'undefined'  ){

        let config = require('../config');
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
    connection.query(query,function (error, results) {
        if(error){
            console.log(error);
            return false;
        }

        console.log(JSON.stringify(results));

        return false;
    });

    // 结束连接
    connection.end()

};

// 对外暴露dbQuery函数
module.exports = dbQuery;
```