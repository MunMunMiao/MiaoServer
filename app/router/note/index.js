const Router = require('koa-router')
const router = new Router()

const User = require('../../controller/user/index')
const user = new User()

router
    .use(async (context, next) => await user.auth(context, next))

    .post('/', async context => {
        await require('../../controller/note/get')(context)
    })
    .post('/push', async context => {
        await require('../../controller/note/push')(context)
    })
    .post('/get', async context => {
        await require('../../controller/note/get')(context)
    })
    .post('/del', async context => {
        await require('../../controller/note/delete')(context)
    })
    .post('/edit', async context => {
        await require('../../controller/note/edit')(context)
    })


module.exports = router