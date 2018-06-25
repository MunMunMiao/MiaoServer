class aliyun {

    create(){

        const OSS = require('ali-oss')
        const oss = new OSS({
            region: userConfig.aliyun.region,
            accessKeyId: userConfig.aliyun.access_key_id,
            accessKeySecret: userConfig.aliyun.access_key_secret,
            secure: userConfig.aliyun.secure,
            bucket: userConfig.aliyun.bucket,
            timeout: userConfig.aliyun.timeout,
        })

        return oss

    }

}

module.exports = aliyun