const signup = async context => {

    const crypto = require('crypto')

    let form = context.request.body.fields || null
    let userName = form.name
    let nickname = form.nickname
    let userPassword = form.password


    let allUserName = await dbQuery('SELECT name FROM user')

    let allUserNameList = []

    for ( let i in allUserName ){

        if ( allUserName[i].name === userName ){

            context.response.body = await sendApiData(0, '不能使用', '', true)

            return
        }

    }


    let encryption = crypto.createHash('RSA-SHA512').update(userPassword).digest('hex')


    let sql = "INSERT INTO user (name, password, portrait, root, admin, nickname, gender, vip, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    let value = [userName, encryption, '', 0, 0, nickname, 0, 0, '']

    let data = await dbQuery(sql, value)


    let results = {}

    for ( let i in data ){

        results[i] = data[i]

    }

    if (  data['affectedRows'] !== 1 ){

        context.response.body = await sendApiData(0, '注册失败', results, true)

    }

    if (  data['affectedRows'] === 1 ){

        context.response.body = await sendApiData(1, '注册成功', results, true)

    }

}
module.exports = signup