const Router = require('koa-router')
const router = new Router()


router
    .get('/', async (context) => {

        const fs = require("fs")

        const getHtml = () => {

            return new Promise( (resolve, reject) => {

                fs.readFile('../../test.html', async (err, data)=>{

                    if(err){
                        console.log(err)
                        reject(err)
                    }

                    resolve(data.toString())

                })

            })
        }

        context.response.type = 'html'
        context.response.body = await getHtml()

    })
    .post('*/language/get', async (context) => {
        await require('../language/get')(context)
    })
    .post('*/user/login', async (context) => {
        await require('../user/login')(context)
    })
    .post('*/user/signup', async (context) => {
        await require('../user/signup')(context)
    })
    .post('*/user/exit', async (context) => {
        await require('../user/exit')(context)
    })
    .post('*/user/getUserData', async (context) => {
        await require('../user/getUserData')(context)
    })
    .post('*/note', async (context) => {
        await require('../note/get')(context)
    })
    .post('*/note/push', async (context) => {
        await require('../note/push')(context)
    })
    .post('*/note/get', async (context) => {
        await require('../note/get')(context)
    })
    .post('*/note/del', async (context) => {
        await require('../note/delete')(context)
    })
    .post('*/note/edit', async (context) => {
        await require('../note/edit')(context)
    })
    .post('*/note/:id', async (context) => {
        let id = context.params.id
        await require('../note/get')(context, id)
    })
    .post('*/cloud/updata', async (context) => {
        await require('../cloud/updata')(context)
    })
    .all('*', async (context) => {
        context.response.status = 403
        context.response.body = '403'
    })


module.exports = router