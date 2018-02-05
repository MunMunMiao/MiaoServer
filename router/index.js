const Router = require('koa-router')
const router = new Router()


router
    .get('/', async (context) => {

        const fs = require("fs")

        const getHtml = () => {

            return new Promise( (resolve, reject) => {

                fs.readFile(appPath + '/test.html', async (err, data)=>{

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
    .post('/user/login', async (context) => {
        require(appPath + '/user/login')(context)
    })
    .post('/language/get', async (context) => {
        require(appPath + '/language/get')(context)
    })


module.exports = router