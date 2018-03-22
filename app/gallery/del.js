module.exports = async context => {

    if ( userData.status === 0 || userData.content.root !== 1 ){
        context.response.body = await utils.send(0, '没有权限', '', true)
        return
    }


    let form = context.request.body.fields === null ? undefined : context.request.body.fields

    let id = form.del

    let sql = 'DELETE FROM gallery WHERE id=?'
    let value = [id]

    let response = await utils.dbQuery(sql, value)

    if ( response.affectedRows === 1 ){
        context.response.body = await utils.send(1, '删除成功', '', true)
        return
    }
    if ( response.affectedRows === 0 ){
        context.response.body = await utils.send(0, '删除失败', '', true)
        return
    }

}