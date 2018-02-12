const edit = async (context) => {


    let userData = await require('../user/checkUser')(context)
    if ( userData.status === 0 ){ return }

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let owner = userData.content.id
    let noteID = form.id.toString()
    let text = form.text.toString()
    let ip = context.request.ip
    let time = new Date().getTime()

    let sql = "UPDATE note SET text=?, ip=?, updataTime=? WHERE id=? AND owner=?"
    let value = [text, ip, time, noteID, owner]

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
module.exports = edit