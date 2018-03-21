const gallery = async context => {

    if ( global.userData.status === 0 ){ return }

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let link = JSON.parse(form.link)

    async function insert(s) {

        let sql = 'INSERT INTO gallery (owner, src, remarks, tag, addTime) VALUES (?, ?, ?, ?, ?)'
        let value = [
            global.userData.content.id,
            s,
            '',
            '',
            new Date().getTime()
        ]

        return await utils.dbQuery(sql, value)

    }

    if ( link.length === 0 ){
        context.response.body = utils.send(0, '内容为空', '', true)
        return
    }

    for ( index in link ){

        let src = link[index].images

        let response = await insert(src)

        if ( response['affectedRows'] === 0 ){

            break
            context.response.body = utils.send(0, '添加失败', response, true)
            return

        }

    }

    context.response.body = utils.send(1, '添加成功', '', true)




}
module.exports = gallery