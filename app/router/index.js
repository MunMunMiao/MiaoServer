const Router = require('koa-router')
const router = new Router()

const user = require('./user/index')
const note = require('./note/index')
const gallery = require('./gallery/index')
const language = require('./language/index')

router
    .prefix('*')

    .use('/user', user.routes())
    .use('/note', note.routes())
    .use('/gallery', gallery.routes())
    .use('/language', language.routes())


module.exports = router