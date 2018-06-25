const koa = require('koa')
const koaBody = require('koa-body')
const router = require('./router/index')
const sequelize = require('sequelize')

const app = new koa

global.userConfig = require('../config')
global.utils = require('./utils/utils')

const Models = require('./models/index')
const models = new Models()

models.setModels()

// const Mongo = require('./models/mongo')
// const mongo = new Mongo()
//
// mongo.link()

app
    .use(koaBody({
        strict: false,
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
            userConfig.app.name
        )
        context.response.set(
            'X-Powered-By',
            userConfig.app.name
        )
        context.response.set(
            'Access-Control-Allow-Origin',
            userConfig.app.Access_Control_Allow_Origin
        )
        context.response.set(
            'Access-Control-Allow-Headers',
            userConfig.app.Access_Control_Allow_Headers
        )
        context.response.set(
            'Access-Control-Allow-Methods',
            userConfig.app.Access_Control_Allow_Methods
        )
        context.response.set(
            'Access-Control-Allow-Credentials',
            userConfig.app.Access_Control_Allow_Credentials
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
