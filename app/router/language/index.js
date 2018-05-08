const Router = require('koa-router')
const Language = require('../../components/language/index')

const router = new Router()
const language = new Language()


router
    .post('/get', async context => language.get(context))
    .post('/reset', async context => language.reset(context))
    .post('/del', async context => language.del(context))


module.exports = router