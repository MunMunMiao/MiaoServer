const Router = require('koa-router')
const router = new Router()

const User = require('../../controller/user/index')
const Aliyun = require('../../controller/aliyun/index')

const user = new User()
const aliyun = new Aliyun()

router
    .use(async (context, next) => await user.auth(context, next))

    .get('/token', async context => await aliyun.getToken(context))


module.exports = router