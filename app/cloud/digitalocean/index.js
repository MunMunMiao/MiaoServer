class digitalocean {

    constructor(object){

        const access_id = userConfig.digitalocean.access_id
        const access_key = userConfig.digitalocean.access_key
        const region = userConfig.digitalocean.region
        const bucket = userConfig.digitalocean.bucket
        const aws = require('aws-sdk')

        const Credentials = new aws.Credentials({
            accessKeyId: access_id,
            secretAccessKey: access_key,
            sessionToken: null
        })

        aws.config.update({
            credentials: Credentials,
            region: region,
            sslEnabled: true,
            endpoint: '{region}.digitaloceanspaces.com'
        })

        this.aws = aws

    }

    showAllBuckets(config){

        const s3 = new this.aws.S3()

        s3.listBuckets((err, data) => {
            console.log(data)
        })

    }

    showAllBucketObjects(config){

        const s3 = new this.aws.S3()
        const bucket = userConfig.digitalocean.bucket

        s3.listObjects({Bucket: bucket}, (err, data) => {
            // console.log(err)
            console.log(data)
        })

    }

    getObjectUrl(key){

        return new Promise((resolve, reject) => {

            if (!key){
                reject(utils.send(0, '', '', false))
                return
            }

            const s3 = new this.aws.S3()
            const bucket = userConfig.digitalocean.bucket
            const expires = userConfig.digitalocean.expires

            s3.getSignedUrl(
                'getObject',
                {
                    Bucket: bucket,
                    Key: key,
                    Expires: expires
                },
                (err, data) => {
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(data)
                }
            )

        })

    }

    putObject(config){

        // {
        //     Bucket: <String>,
        //     Body: <Binary String>,
        //     Key: <String>
        // }

        return new Promise((resolve, reject) => {

            if (!config){
                reject(utils.send(0, '', '', false))
                return
            }

            const s3 = new this.aws.S3()
            const bucket = userConfig.digitalocean.bucket

            s3.putObject(
                {
                    Body: config.data,
                    Bucket: bucket,
                    Key: config.name,
                    ContentType: config.type
                },
                (err, data) => {
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(data)
                }
            )

        })

    }

    deleteObjects(objects){

        // {
        //     Bucket: <String>,
        //     Delete: {
        //         Objects: <Object Array>
        //     }
        // }

        return new Promise((resolve, reject) => {

            if (!objects){
                reject(utils.send(0, '', '', false))
                return
            }

            const s3 = new this.aws.S3()
            const bucket = userConfig.digitalocean.bucket

            s3.deleteObjects(
                {
                    Bucket: bucket,
                    Delete: {
                        Objects: objects
                    }
                },
                (err, data) => {
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(data)
                }
            )

        })

    }

}

module.exports = digitalocean