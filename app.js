global.appPath = __dirname
const koa = require('koa')
const app = new koa
const koaBody = require('koa-body')
const router = require('./router/index')

app.use(koaBody({
    encoding:'utf-8',
    multipart:true,
    formidable:{
        uploadDir:appPath + '/tmp',
        keepExtensions:true,
        hash:'md5',
        multiples:true
    }
}))


app.use( router.routes() )

app.listen(2100, ()=>{
    console.log('Server Running on http://127.0.0.1:2100')
})