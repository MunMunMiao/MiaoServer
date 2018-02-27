const push = async context => {

    if ( global.userData.status === 0 ){ return }

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let owner = global.userData.content.id
    let text = form.text.toString()
    let ip = context.request.ip
    let time = new Date().getTime()

    let sql = "INSERT INTO note (owner, text, ip, time, updataTime) VALUES (?, ?, ?, ?, ?)"
    let value = [owner, text, ip, time, time]

    let data = await dbQuery(sql, value)

    let results = {}

    for ( let i in data ){

        results[i] = data[i]

    }

    if (  results['affectedRows'] !== 1 ){

        context.response.body = await sendApiData(0, '创建失败', results, true)

    }

    if (  results['affectedRows'] === 1 ){

        context.response.body = await sendApiData(1, '创建成功', results, true)

    }


}
module.exports = push