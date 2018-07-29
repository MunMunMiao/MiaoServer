const Router = require('koa-router')
const Language = require('../../controller/language/index')
const User = require('../../controller/user/index')

const router = new Router()
const language = new Language()
const user = new User()


router
    .post('/get', async context => language.get(context))

router
    .use(async (context, next) => await user.auth(context, next))

    .post('/reset', async context => language.reset(context))
    .post('/del', async context => language.del(context))


module.exports = router