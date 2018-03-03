const koa = require('koa')
const app = new koa
const koaBody = require('koa-body')
const router = require('./router/index')

global.dbQuery = require('./plug/dbQuery')
global.sendApiData = require('./plug/sendApiData')
global.userConfig = require('../config')

app
    .use(koaBody({
        encoding: 'utf-8',
        multipart: true,
        formidable:{
            uploadDir: global.userConfig.path.tmp,
            keepExtensions: true,
            hash: false,
            multiples: true
        }
    }))

    .use(async (context, next) => {
        context.response.set('Server', global.userConfig.app.name)
        context.response.set('X-Powered-By', global.userConfig.app.name)
        context.response.set('Access-Control-Allow-Origin', global.userConfig.app.domain)
        context.response.set('Access-Control-Allow-Headers', 'X-Requested-With')
        context.response.set('Access-Control-Allow-Methods', 'POST')
        context.response.set('Access-Control-Allow-Credentials', 'true')
        context.response.set('X-XSS-Protection', '1; mode=block;')
        context.response.set('X-Content-Type-Options', 'nosniff')
        await next()
    })

    .use(async (context, next) => {

        global.userData = await require('./user/checkUser')(context)
        await next()

    })

    .use( router.routes() )
    .use( router.allowedMethods() )


    .listen(global.userConfig.app.port, global.userConfig.app.ip)