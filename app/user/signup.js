const signup = async (context) => {

    const crypto = require('crypto')

    let form = context.request.body.fields || null
    let userName = form.name.toString()
    let userPassword = form.password.toString()

    let encryption = crypto.createHash('RSA-SHA512').update(userPassword).digest('hex')


    let sql = "INSERT INTO user (name, password, root, admin, nickname, gender) VALUES (?, ?, ?, ?, ?, ?)"
    let value = [userName, encryption, 0, 0, userName, 0]

    let data = await dbQuery(sql, value)


    let results = {}

    for ( let i in data ){

        results[i] = data[i]

    }

    if (  data['affectedRows'] !== 1 ){

        context.response.body = sendApiData(0, '注册失败', results, true)

    }

    if (  data['affectedRows'] === 1 ){

        context.response.body = sendApiData(1, '注册成功', results, true)

    }

}
module.exports = signup