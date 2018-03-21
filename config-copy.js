const config = {

    mysql:{
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
        charset: 'UTF8_GENERAL_CI',
        multipleStatements: true,
        debug: false
    },
    app:{
        name: '',
        domain: '',
        ip: '',
        port: '',
        Access_Control_Allow_Origin: '',
        Access_Control_Allow_Methods: 'POST, GET, OPTIONS',
        Access_Control_Allow_Credentials: 'true',
        Access_Control_Allow_Headers: 'X-Requested-With',
    },
    path:{
        cloud:'',
        resource:'',
        tmp:'',
        error_log: '',
        log: ''
    }

}
module.exports = config