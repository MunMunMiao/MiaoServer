const Router = require('koa-router')
const router = new Router()


router
    .post('/login', async context => {
        await require('../../components/user/login')(context)
    })
    .post('/signup', async context => {
        await require('../../components/user/signup')(context)
    })
    .post('/exit', async context => {
        await require('../../components/user/exit')(context)
    })
    .post('/getUserData', async context => {
        await require('../../components/user/getUserData')(context)
    })
    .post('/setUserPortrait', async context => {
        await require('../../components/user/setUserPortrait')(context)
    })


module.exports = router