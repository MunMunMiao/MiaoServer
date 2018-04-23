const edit = async context => {


    if ( global.userData.status === 0 ){ return }

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let owner = global.userData.content.id
    let noteID = form.id.toString()
    let text = form.text.toString()
    let ip = context.request.ip
    let time = new Date().getTime()

    const noteDB = await db.import('../../dbTable/note.js')

    await noteDB.sync({alter: true})

    let response = await noteDB.update({
        text: text,
        ip: ip,
        updataTime: time
    },{
        where: {
            id: noteID,
            owner: owner
        }
    })


    if ( response[0] !== 1 ){
        context.response.body = await sendApiData(0, '修改失败', '', true)
    }
    if ( response[0] === 1 ){
        context.response.body = await sendApiData(1, '修改成功', '', true)
    }


}
module.exports = edit