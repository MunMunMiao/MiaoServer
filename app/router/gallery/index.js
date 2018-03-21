const Router = require('koa-router')
const router = new Router()


router
    .post('/push', async context => {
        await require('../../gallery/push')(context)
    })
    .post('/get', async context => {
        await require('../../gallery/get')(context)
    })
    .post('/del', async context => {
        await require('../../gallery/del')(context)
    })


module.exports = router