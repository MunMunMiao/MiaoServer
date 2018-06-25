const Router = require('koa-router')
const router = new Router()

const User = require('../../components/user/index')
const user = new User()

router
    .use(async (context, next) => await user.auth(context, next))

    .post('/', async context => {
        await require('../../components/note/get')(context)
    })
    .post('/push', async context => {
        await require('../../components/note/push')(context)
    })
    .post('/get', async context => {
        await require('../../components/note/get')(context)
    })
    .post('/del', async context => {
        await require('../../components/note/delete')(context)
    })
    .post('/edit', async context => {
        await require('../../components/note/edit')(context)
    })


module.exports = router