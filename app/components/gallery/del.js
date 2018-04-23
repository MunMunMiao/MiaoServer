module.exports = async context => {

    if ( userData.status === 0 || userData.content.root !== 1 ){
        context.response.body = await utils.send(0, '没有权限', '', true)
        return
    }

    let id = context.request.body.id || undefined

    const galeryDB = await db.import('../../dbTable/gallery.js')
    await galeryDB.sync({alter: true})


    let response = await galeryDB.update({
        survival: 0
    },{
        where: {
            id: id
        }
    })

    if ( response[0] !== 1 ){
        context.response.body = await sendApiData(0, '删除成功', '', true)
    }
    if ( response[0] === 1 ){
        context.response.body = await sendApiData(1, '删除失败', '', true)
    }

}