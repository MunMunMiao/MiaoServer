const Router = require('koa-router')
const router = new Router()


router
    .post('/login', async context => {
        await require('../../user/login')(context)
    })
    .post('/signup', async context => {
        await require('../../user/signup')(context)
    })
    .post('/exit', async context => {
        await require('../../user/exit')(context)
    })
    .post('/getUserData', async context => {
        await require('../../user/getUserData')(context)
    })
    .post('/setUserPortrait', async context => {
        await require('../../user/setUserPortrait')(context)
    })


module.exports = router