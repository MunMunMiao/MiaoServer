module.exports = class {

    constructor(context){

        let config = context.userConfig

        const OSS = require('ali-oss')
        const oss = new OSS({
            region: config.aliyun.region,
            accessKeyId: config.aliyun.access_key_id,
            accessKeySecret: config.aliyun.access_key_secret,
            secure: config.aliyun.secure,
            bucket: config.aliyun.bucket,
            timeout: config.aliyun.timeout,
            cname: config.aliyun.cname,
            endpoint: config.aliyun.endpoint
        })

        this.OSS = oss

    }

    async putBuffer(key, data){

        const OSS = this.OSS

        return OSS.put(key, data)

    }

    async putBlob(){

        const OSS = this.OSS

    }

    async signatureUrl(key, process){

        const OSS = this.OSS

        return OSS.signatureUrl(key, {
                expires: 3600,
                process: process || ''
            })

    }

}