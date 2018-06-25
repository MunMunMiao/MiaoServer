class user {

    async auth(context, next){

        let uid = context.cookies.get('uid') || undefined
        let token = context.cookies.get('token') || undefined

        if ( uid === undefined || token === undefined ){
            return context.response.body = utils.send(0, '','', false)
        }

        const crypto = require('crypto')

        let results = await Models.user.findOne({
            where: {
                id: uid
            }
        })

        if ( results.password === undefined ){
            return context.response.body = utils.send(0, '', '', false)
        }

        let encryption = crypto.createHash('RSA-SHA512').update(results.password).digest('hex')

        if ( token === encryption ){
            global.userData = utils.send(1, '', results, false)
            await next()
        }

        if ( token !== encryption ){
            return context.response.body = utils.send(0, '','', false)
        }

    }

    async getUserData(context){

        const S3 = require('../../cloud/digitalocean/index')
        const s3 = new S3()

        let results = {
            id: userData.content.id,
            admin: userData.content.admin,
            root: userData.content.root,
            portrait: userData.content.portrait_key,
            gender: userData.content.gender,
            nickname: userData.content.nickname,
        }

        results.portrait = await s3.getObjectUrl(results.portrait)

        context.response.body = utils.send(1, '', results, true)

    }

    async exit(context){

        context.cookies
            .set('uid', '', {
                expires: new Date(0)
            })
            .set('token', '', {
                expires: new Date(0)
            })

        context.response.body = utils.send(1, '已退出', '', true)

    }

    async login(context){

        const userName = context.request.body.name
        const userPassword = context.request.body.password

        const crypto = require('crypto')

        const encryption = crypto.createHash('RSA-SHA512').update(userPassword).digest('hex')

        let results = await Models.user.findOne({
            where: {
                name: userName
            }
        })

        // 在对用户输入的密码加密后与数据库的值不一致，返回失败
        if ( results.password !== encryption ){
            context.response.body = await utils.send(0, '账号或者密码错误', '', true)
        }

        // 在对用户输入的密码加密后与数据库的值一致
        if ( results.password === encryption ){

            let uid = results.id
            let token = crypto.createHash('RSA-SHA512').update(results.password).digest('hex')

            context.cookies
                .set('uid', uid, {
                    domain: global.userConfig.domain,
                    path:'/',
                    expires: new Date(new Date().getTime() + 100*24*60*60*1000),
                    httpOnly: true,
                    secure: context.request.protocol ===  'https' ? true : false,
                    overwrite: true
                })
                .set('token', token, {
                    domain: userConfig.domain,
                    path:'/',
                    expires: new Date(new Date().getTime() + 100*24*60*60*1000),
                    httpOnly: true,
                    secure: context.request.protocol ===  'https' ? true : false,
                    overwrite: true
                })


            context.response.body = utils.send(1, '登录成功', '', true)

        }

    }

    async setPortrait(context){

        const S3 = require('../../cloud/digitalocean/index')
        const fs = require('fs')
        const gm = require('gm')
        const crypto = require('crypto')
        const user_id = global.userData.content.id
        const portrait_key = global.userData.content.portrait_key
        const s3 = new S3()

        const file = context.request.files
        const photo = file.photo
        const photo_path = photo.path

        const tmp_path = userConfig.path.tmp

        const outPhoto_name = crypto.createHash('sha256').update(photo_path).digest('hex')
        const outPhoto_type = 'image/png'
        const outPhoto_path = tmp_path + '/' + outPhoto_name

        const outPhoto = await new Promise((resolve, reject) => {
            gm(photo_path)
                .resize(120)
                .quality(70)
                .noProfile()
                .setFormat('png')
                .write(outPhoto_path, async () => {
                    await fs.unlink(photo_path, () => {})
                    resolve()
                })
        })

        const buffer = await new Promise((resolve, reject) => {
            fs.readFile(outPhoto_path, (err, data) => {
                if (err){
                    reject(err)
                    return
                }
                resolve(data)
            })
        })

        await s3.putObject({
            name: outPhoto_name,
            data: buffer,
            type: outPhoto_type
        })

        await fs.unlink(outPhoto_path, () => {})
        await fs.unlink(photo_path, () => {})

        await s3.deleteObjects([
            {
                Key: portrait_key
            }
        ])

        await Models.user.update({
            portrait_key: outPhoto_name
        },{
            where: {
                id: user_id
            }
        })

        context.response.body = utils.send(1, '', '', true)

    }

}

module.exports = user