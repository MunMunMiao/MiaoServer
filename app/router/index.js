const Router = require('koa-router')
const router = new Router()

const user = require('./user/index')
const note = require('./note/index')
const gallery = require('./gallery/index')


router.use('/user', user.routes())
router.use('/note', note.routes())
router.use('/gallery', gallery.routes())

router
    .prefix('*')
    .post('/language/get', async context => {
        await require('../language/get')(context)
    })
    .post('/cloud/updata', async context => {
        await require('../cloud/updata')(context)
    })
    .all('*', async context => {
        context.response.status = 403
        context.response.body = '403'
    })


module.exports = router