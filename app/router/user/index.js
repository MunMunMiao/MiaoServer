const Router = require('koa-router')
const User = require('../../controller/user/index')

const router = new Router()
const user = new User()

router
    .post('/login', async context => await user.login(context))
    .post('/signup', async context => {
        await require('../../controller/user/signup')(context)
    })

router
    .use(async (context, next) => await user.auth(context, next))

    .post('/exit', async context => await user.exit(context))
    .post('/getUserData', async context => await user.getUserData(context))
    .put('/setPortrait', async context => await user.setPortrait(context))


module.exports = router