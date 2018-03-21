const Router = require('koa-router')
const router = new Router()


router
    .post('/', async context => {
        await require('../../note/get')(context)
    })
    .post('/push', async context => {
        await require('../../note/push')(context)
    })
    .post('/get', async context => {
        await require('../../note/get')(context)
    })
    .post('/del', async context => {
        await require('../../note/delete')(context)
    })
    .post('/edit', async context => {
        await require('../../note/edit')(context)
    })
    .post('/:id', async context => {
        let id = context.params.id
        await require('../../note/get')(context, id)
    })


module.exports = router