module.exports = class {

    constructor(){

        const config = require('../../../config.js')

        const OSS = require('ali-oss')
        const oss = new OSS({
            region: config.aliyun.region,
            accessKeyId: config.aliyun.accessKeyid,
            accessKeySecret: config.aliyun.accessKeySecret,
            secure: config.aliyun.secure,
            bucket: config.aliyun.bucket,
            timeout: config.aliyun.timeout,
            cname: config.aliyun.cname,
            endpoint: config.aliyun.endpoint
        })

        this.client = oss

    }

    async getToken(context){

        const client = require('ali-oss')
        let config = context.userConfig
        let uid = context.userData.content.id

        let sts = new client.STS({
            accessKeyId: config.aliyun.accessKeyid,
            accessKeySecret: config.aliyun.accessKeySecret
        })

        let token = await sts.assumeRole(
            config.aliyun.sts.role_arn,
            config.aliyun.sts.policy,
            config.aliyun.sts.expiration,
            uid
        )

        context.response.body = context.utils.send(1, null, token.credentials, true)

    }

    async getImageTones(key){

        const axios = require('axios')
        let fileUrl = await this.signatureUrl('/images/' + key, 'image/average-hue')

        return axios
            .get(fileUrl)
            .then(r => {

                let value = r.data.RGB
                let color = value.split(/^0x/gi)[1]

                return color

            })

    }

    async signatureUrl(key, process){

        const client = this.client

        return client.signatureUrl(key, {
                expires: 3600,
                process: process || ''
            })

    }

    async delete(key){

        const client = this.client

        return client.delete('key')

    }

}