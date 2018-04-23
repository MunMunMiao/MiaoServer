const Router = require('koa-router')
const router = new Router()


router
    .post('/get', async context => {
        await require('../../components/language/get')(context)
    })
    .post('/reset', async context => {
        await require('../../components/language/reset')(context)
    })
    .post('/del', async context => {
        await require('../../components/language/del')(context)
    })


module.exports = router