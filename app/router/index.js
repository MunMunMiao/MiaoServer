const Router = require('koa-router')
const router = new Router()

const user = require('./user/index')
const note = require('./note/index')
const gallery = require('./gallery/index')
const language = require('./language/index')


router.use('/user', user.routes())
router.use('/note', note.routes())
router.use('/gallery', gallery.routes())
router.use('/language', language.routes())

router
    .prefix('*')

    .post('/cloud/updata', async context => {
        await require('../components/cloud/updata')(context)
    })
    .all('*', async context => {
        context.response.status = 403
        context.response.body = '403'
    })


module.exports = router