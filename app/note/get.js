const getNote = async (context, id) => {

    let noteID = id || undefined

    let userData = await require('../user/checkUser')(context)
    if ( userData.status === 0 ){ return }

    let uid = userData.content.id
    let admin = userData.content.admin
    let root = userData.content.root

    let sql
    let value

    // 拥有root权限，并且有请求noteID
    if ( root === 1 && noteID !== undefined ){
        sql = "SELECT * FROM note WHERE id=? ORDER BY time DESC"
        value = [noteID]
    }
    // 拥有root权限，没有请求noteID
    if ( root === 1 && noteID === undefined ){
        sql = "SELECT * FROM note ORDER BY time DESC"
    }
    // 普通用户，并且有请求noteID
    if ( root === 0 && noteID !== undefined ){
        sql = "SELECT * FROM note WHERE owner=? AND id=? ORDER BY time DESC"
        value = [uid, noteID]
    }
    // 普通用户，没有请求noteID
    if ( root === 0 && noteID === undefined ){
        sql = "SELECT * FROM note WHERE owner=? ORDER BY time DESC"
        value = [uid]
    }

    let data = await dbQuery(sql, value)

    let results = []

    for ( let i in data ){

        let id = data[i]['id']
        let text = data[i]['text']
        let ip = data[i]['ip']
        let time = data[i]['time']

        results.push({
            id:id,
            text:text,
            ip:ip,
            time:time
        })

    }

    context.response.body =  await sendApiData(1, '', results, true)



}
module.exports = getNote