const config = {

    mysql:{
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
        log: false
    },
    app:{
        name: '',
        domain: '',
        ip: '',
        port: '',
        Access_Control_Allow_Origin: '',
        Access_Control_Allow_Methods: 'POST, GET, OPTIONS',
        Access_Control_Allow_Credentials: 'true',
        Access_Control_Allow_Headers: 'X-Requested-With, Content-Type',
    },
    path:{
        cloud:'',
        static:'',
        tmp:'',
        error_log: '',
        log: ''
    }

}
module.exports = config