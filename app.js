global.appPath = __dirname
const koa = require('koa')
const app = new koa
const koaBody = require('koa-body')
const router = require('./router/index')
global.dbQuery = require(appPath + '/plug/dbQuery')
global.sendApiData = require(appPath + '/plug/sendApiData')
global.userConfig = require(appPath + '/config')

app
    .use(koaBody({
        encoding:'utf-8',
        multipart:true,
        formidable:{
            uploadDir:userConfig.path.tmp,
            keepExtensions:true,
            hash: false,
            multiples:true
        }
    }))

    .use(async (context, next)=>{
        context.response.set('Server', 'Elris')
        context.response.set('Access-Control-Allow-Origin', '*')
        context.response.set('Access-Control-Allow-Headers', 'X-Requested-With')
        context.response.set('Access-Control-Allow-Methods', 'POST')
        context.response.set('Access-Control-Allow-Credentials', 'true')
        await next()
    })

    .use( router.routes() )
    .use( router.allowedMethods() )


    .listen(2100, '0.0.0.0')