const getNote = async context => {

    if ( global.userData.status === 0 ){
        context.response.body = await sendApiData(0, '请登录', '', true)
        return
    }

    const noteDB = Models.note

    await noteDB.sync({alter: true})

    let id = context.request.body.id

    let noteID = id === undefined ? undefined : id

    let uid = global.userData.content.id
    let admin = global.userData.content.admin
    let root = global.userData.content.root

    let response

    // 拥有root权限，并且有请求noteID
    if ( root === 1 && noteID !== undefined ){
        response = await noteDB.findAndCountAll({
            where: {id: noteID},
            order: [
                ['updataTime', 'DESC']
            ]
        })
    }
    // 拥有root权限，没有请求noteID
    if ( root === 1 && noteID === undefined ){
        response = await noteDB.findAndCountAll({
            order: [
                ['updataTime', 'DESC']
            ]
        })
    }
    // 普通用户，并且有请求noteID
    if ( root === 0 && noteID !== undefined ){
        response = await noteDB.findAndCountAll({
            where: {
                id: noteID,
                owner: uid
            },
            order: [
                ['updataTime', 'DESC']
            ]
        })
    }
    // 普通用户，没有请求noteID
    if ( root === 0 && noteID === undefined ){
        response = await noteDB.findAndCountAll({
            where: {
                owner: uid
            },
            order: [
                ['updataTime', 'DESC']
            ]
        })
    }


    let results = []

    for ( let i in response.rows ){

        let id = response.rows[i]['id']
        let text = response.rows[i]['text']
        let ip = response.rows[i]['ip']
        let time = response.rows[i]['time']
        let updataTime = response.rows[i]['updataTime']

        results.push({
            id:id,
            text:text,
            ip:ip,
            time:time,
            updataTime:updataTime
        })

    }

    context.response.body =  await utils.send(1, '', results, true)



}
module.exports = getNote