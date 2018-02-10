const checkUser = async (context) => {

    let uid = context.cookies.get('uid') || undefined
    let token = context.cookies.get('token') || undefined

    if ( uid === undefined || token === undefined ){
        return await sendApiData(0, '','', false)
    }

    const crypto = require('crypto')

    let sql = "SELECT * FROM user WHERE id=? LIMIT 1"
    let value = [uid]
    let data = await dbQuery(sql, value)

    let results = {}

    for ( let i in data[0] ){
        results[i] = data[0][i]
    }

    let encryption = crypto.createHash('RSA-SHA512').update(results.password).digest('hex')

    if ( token === encryption ){
        return await sendApiData(1, '', results, false)
    }

    if ( token !== encryption ){
        context.response.body = await sendApiData(0, '请重新登陆','', true)
        return await sendApiData(0, '','', true)
    }

}
module.exports = checkUser