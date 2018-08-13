module.exports = {

    mysql:{
        host:'',
        port:'',
        user:'',
        password:'',
        database:'',
        log: false
    },
    app:{
        name: '',
        domain: '',
        running: {
            ip: '',
            port: '',
        },
        access_control: {
            allow_origin: '*',
            allow_methods: 'OPTIONS, GET, PUT, POST, DELETE',
            allow_credentials: 'true',
            allow_headers: 'X-Requested-With, Content-Type',
        }
    },
    aliyun: {
        accessKeyid: '',
        accessKeySecret: '',
        region: '',
        secure: true,
        bucket: '',
        internal: false,
        timeout: 0,
        cname: false,
        endpoint: '',
        sts: {
            role_arn: '',
            policy: '',
            expiration: 60 * 60 * 1,
            session_name: ''
        }
    },
    directory: {
        prefix: '',
        path: {
            data: '',
            tmp: '',
            error_log: '',
            log: ''
        }
    }

}