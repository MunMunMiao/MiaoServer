module.exports = async (context, send) => {

    let id = context.request.body.id

    const languageDB = await db.import('../../dbTable/language.js')
    await languageDB.sync({alter: true})

    let response = await languageDB.destroy({
        where: {
            id: id
        }
    })

    if ( response === 1 ){
        context.response.body = await utils.send(1, '删除成功', '', true)
    }
    if ( response === 0 ){
        context.response.body = await utils.send(0, '删除成功', '', true)
    }

}