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
            context.userData = utils.send(1, '', results, false)
            await next()
        }

        if ( token !== encryption ){
            return context.response.body = utils.send(0, '','', false)
        }

    }

    async getUserData(context){

        const oss = new context.oss()
        let user = context.userData.content

        let results = {
            id: user.id,
            admin: user.admin,
            root: user.root,
            portrait: user.portrait_key,
            gender: user.gender,
            nickname: user.nickname,
        }

        results.portrait = await oss.signatureUrl(results.portrait, 'style/icon')

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

        let key = context.request.body.key
        let uid = context.userData.content.id

        await context.Models.user.update({
            portrait_key: key
        },{
            where: {
                id: uid
            }
        })

        context.response.body = utils.send(1, '修改成功', '', true)

    }

}

module.exports = user