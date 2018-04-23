const Router = require('koa-router')
const router = new Router()


router
    .post('/push', async context => {
        await require('../../components/gallery/push')(context)
    })
    .post('/get', async context => {
        await require('../../components/gallery/get')(context)
    })
    .post('/del', async context => {
        await require('../../components/gallery/del')(context)
    })
    .post('/getImageInfo', async context => {
        await require('../../components/gallery/getImageInfo')(context)
    })


module.exports = router