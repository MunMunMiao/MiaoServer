const login = async (context) => {

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let userName = form.name.toString()
    let userPassword = form.password.toString()


    const crypto = require('crypto')

    let encryption = crypto.createHash('RSA-SHA512').update(userPassword).digest('hex')

    let sql = "SELECT * FROM user WHERE name=? LIMIT 1"
    let value = [userName]

    let data = await dbQuery(sql, value)

    let results = {}

    for ( let i in data[0] ){
        results[i] = data[0][i]
    }

    // 在对用户输入的密码加密后与数据库的值不一致，返回失败
    if ( results.password !== encryption ){

        context.response.body = await sendApiData(0, '信息错误', '', true)

    }

    // 在对用户输入的密码加密后与数据库的值一致
    if ( results.password === encryption ){

        let uid = results.id
        let token = crypto.createHash('RSA-SHA512').update(results.password).digest('hex')

        await context.cookies
            .set('uid', uid, {
                domain: userConfig.domain,
                path:'/',
                expires: new Date(new Date().getTime() + 100*24*60*60*1000),
                httpOnly: true,
                secure: context.request.protocol ===  'https' ? true : false,
                overwrite: true
            })
            .set('token', token, {
                domain: userConfig.domain,
                path:'/',
                expires: new Date(new Date().getTime() + 100*24*60*60*1000),
                httpOnly: true,
                secure: context.request.protocol ===  'https' ? true : false,
                overwrite: true
            })

        context.response.body = await sendApiData(1, '登录成功', '', true)

    }


}
module.exports = login