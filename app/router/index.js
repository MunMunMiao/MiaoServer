const Router = require('koa-router')
const router = new Router()

const user = require('./user/index')
const note = require('./note/index')
const gallery = require('./gallery/index')
const language = require('./language/index')
const aliyun = require('./aliyun/index')

router
    .prefix('*')

    .use('/user', user.routes())
    .use('/note', note.routes())
    .use('/gallery', gallery.routes())
    .use('/language', language.routes())
    .use('/aliyun', aliyun.routes())


module.exports = router