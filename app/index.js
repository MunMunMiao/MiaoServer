const koa = require('koa')
const app = new koa
const koaBody = require('koa-body')
const router = require('./router/index')
const sequelize = require('sequelize')

global.dbQuery = require('./plug/dbQuery')
global.sendApiData = require('./plug/sendApiData')
global.userConfig = require('../config')
global.utils = require('./plug/utils')
global.db = new sequelize(userConfig.mysql.database, userConfig.mysql.user, userConfig.mysql.password, {
    host: userConfig.mysql.host,
    port: userConfig.mysql.port,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: userConfig.mysql.log,
    pool: {
        max: 6,
        min: 0,
        acquire: 50000,
        idle: 10000
    },
    define: {
        createdAt: false,
        updatedAt: false,
        underscored: false,
        freezeTableName: true,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: false,
        version: false
    },
    query:{
        raw: true
    }
})

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
        context.response.set('Access-Control-Allow-Origin', global.userConfig.app.Access_Control_Allow_Origin)
        context.response.set('Access-Control-Allow-Headers', global.userConfig.app.Access_Control_Allow_Headers)
        context.response.set('Access-Control-Allow-Methods', global.userConfig.app.Access_Control_Allow_Methods)
        context.response.set('Access-Control-Allow-Credentials', global.userConfig.app.Access_Control_Allow_Credentials)
        context.response.set('X-XSS-Protection', '1; mode=block;')
        context.response.set('X-Content-Type-Options', 'nosniff')
        await next()
    })

    .use(async (context, next) => {

        // global.language = await require('./language/get')(context, false)
        // console.log(global.language['login'])
        await next()

    })

    .use(async (context, next) => {

        global.userData = await require('./components/user/checkUser')(context)
        await next()

    })

    .use( router.routes() )
    .use( router.allowedMethods() )


    .listen(global.userConfig.app.port, global.userConfig.app.ip)