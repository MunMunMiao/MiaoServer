const del = async context => {


    if ( global.userData.status === 0 ){ return }

    let id = context.request.body.id === undefined ? undefined : context.request.body.id

    let uid = global.userData.content.id
    let noteID = id

    const noteDB = Models.note
    await noteDB.sync({alter: true})

    let response

    if ( global.userData.content.root === 1 ){

        response = await noteDB.destroy({
            where: {
                id: noteID
            }
        })

    }
    if ( global.userData.content.root === 0 ){

        response = await noteDB.destroy({
            where: {
                id: noteID,
                owner: uid
            }
        })

    }

    if ( response === 0 ){
        context.response.body = await utils.send(0, '删除失败', '', true)
    }

    if ( response === 1 ){
        context.response.body = await utils.send(1, '删除成功', '', true)
    }


}
module.exports = del