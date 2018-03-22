module.exports = async context => {

    if ( global.userData.status === 0 ){ return }

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let link = JSON.parse(form.link)

    if ( link.length === 0 ){
        context.response.body = utils.send(0, '内容为空', '', true)
        return
    }


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
    async function query(s) {
        let sql = 'SELECT * FROM gallery WHERE src=?'
        let value = [s]

        return await utils.dbQuery(sql, value)
    }



    for ( index in link ){

        let src = link[index].images
        let q = await query(src)


        // 数据库已存在
        // if ( q[0] !== undefined ){
        //
        // }

        // 数据库未存在
        if ( q[0] === undefined ){
            await insert(src)
        }


    }

    context.response.body = utils.send(1, '添加成功', '', true)




}