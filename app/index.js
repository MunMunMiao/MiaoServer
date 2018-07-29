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
app.context.oss = require('./oss/index')

app
    .use(koaBody({
        strict: false,
        formLimit: 10 * 1024 *1024 * 1024,
        textLimit: 10 * 1024 *1024 * 1024,
        jsonLimit: 10 * 1024 *1024 * 1024,
        jsonStrict: true,
        encoding: 'utf-8',
        multipart: true,
        formidable: {
            uploadDir: global.userConfig.path.tmp,
            maxFileSize: 10 * 1024 *1024 * 1024,
            maxFields: 1000000
        }
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
            context.userConfig.app.Access_Control_Allow_Origin
        )
        context.response.set(
            'Access-Control-Allow-Headers',
            context.userConfig.app.Access_Control_Allow_Headers
        )
        context.response.set(
            'Access-Control-Allow-Methods',
            context.userConfig.app.Access_Control_Allow_Methods
        )
        context.response.set(
            'Access-Control-Allow-Credentials',
            context.userConfig.app.Access_Control_Allow_Credentials
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
        global.userConfig.app.port,
        global.userConfig.app.ip
    )
