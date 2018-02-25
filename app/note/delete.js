const del = async context => {


    if ( global.userData.status === 0 ){ return }

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let uid = global.userData.content.id
    let noteID = form.del

    let sql = "DELETE FROM note WHERE id=? AND owner=?"
    let value = [noteID, uid]

    let data = await dbQuery(sql, value)

    let results = {}

    for ( let i in data ){

        results[i] = data[i]

    }

    if (  results['affectedRows'] !== 1 ){

        context.response.body = await sendApiData(0, '删除失败', results, true)

    }

    if (  results['affectedRows'] === 1 ){

        context.response.body = await sendApiData(1, '删除成功', results, true)

    }


}
module.exports = del