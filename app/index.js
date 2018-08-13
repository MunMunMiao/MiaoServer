const koa = require('koa')
const koaBody = require('koa-body')
const router = require('./router/index')

const app = new koa()

global.userConfig = require('../config')
global.utils = require('./utils/utils')

const Models = require('./models/index')
const models = new Models()

models.setModels(app)

app.context.utils = require('./utils/utils')
app.context.userConfig = require('../config')
app.context.oss = require('./controller/aliyun/index')

app
    .use(koaBody({
        strict: true,
        formLimit: '2mb',
        textLimit: '2mb',
        jsonLimit: '2mb',
        jsonStrict: true,
        json: true,
        text: true,
        urlencoded: true,
        encoding: 'utf-8',
        multipart: true,
        formidable: {
            uploadDir: userConfig.directory.path.tmp,
            keepExtensions: false,
            maxFileSize: 2 * 1024 * 1024,
            maxFields: 10000,
            hash: 'md5',
            multiples: true
        },
        onError: e => console.log(e)
    }))

    .use(async (context, next) => {
        context.response.set(
            'Server',
            context.userConfig.app.name
        )
        context.response.set(
            'X-Powered-By',
            context.userConfig.app.name
        )
        context.response.set(
            'Access-Control-Allow-Origin',
            context.userConfig.app.access_control.allow_origin
        )
        context.response.set(
            'Access-Control-Allow-Headers',
            context.userConfig.app.access_control.allow_headers
        )
        context.response.set(
            'Access-Control-Allow-Methods',
            context.userConfig.app.access_control.allow_methods
        )
        context.response.set(
            'Access-Control-Allow-Credentials',
            context.userConfig.app.access_control.allow_credentials
        )
        context.response.set(
            'X-XSS-Protection',
            '1; mode=block;'
        )
        context.response.set(
            'X-Content-Type-Options',
            'nosniff'
        )

        await next()
    })

    .use( router.routes() )
    .use( router.allowedMethods() )


    .listen(
        app.context.userConfig.app.running.port,
        app.context.userConfig.app.running.ip
    )
