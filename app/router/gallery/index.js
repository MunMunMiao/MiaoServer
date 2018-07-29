const Router = require('koa-router')
const router = new Router()

const User = require('../../controller/user/index')
const Gallery = require('../../controller/gallery/index')
const user = new User()
const gallery = new Gallery()

router
    .use(async (context, next) => await user.auth(context, next))

    .put('/', async context => await gallery.push(context))
    .get('/', async context => await gallery.get(context))
    .delete('/', async context => await gallery.del(context))
    .post('/getImageInfo', async context => await gallery.getImageInfo(context))


module.exports = router