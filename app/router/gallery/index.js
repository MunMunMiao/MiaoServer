const Router = require('koa-router')
const router = new Router()

const User = require('../../components/user/index')
const Gallery = require('../../components/gallery/index')
const user = new User()
const gallery = new Gallery()

router
    .use(async (context, next) => await user.auth(context, next))

    .post('/push', async context => await gallery.push(context))
    .post('/get', async context => await gallery.get(context))
    .post('/del', async context => await gallery.del(context))
    .post('/getImageInfo', async context => await gallery.getImageInfo(context))


module.exports = router