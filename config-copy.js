const config = {

    mysql:{
        host: '',
        port: '',
        user: '',
        database: '',
        password: '',
        charset: 'UTF8_GENERAL_CI',
        debug: false
    },
    app:{
        domain: ''
    },
    path:{
        cloud:'/web/cloud/',
        tmp:'/web/tmp/',
        error_log: '/web/log',
        log: '/web/log'
    }

}
module.exports = config