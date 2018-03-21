module.exports = async context => {

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let sql
    let value

    async function getAllSize() {

        sql = 'SELECT COUNT(*) FROM gallery'
        let r = await utils.dbQuery(sql)

        return r[0]['COUNT(*)']

    }


    let nextID = form.next
    let all = await getAllSize()
    let next = all - parseInt(nextID, 10)
    let response

    if ( nextID !== undefined ){

        sql = 'SELECT * FROM gallery WHERE id<? ORDER BY addTime DESC LIMIT 20'
        value = [nextID]

        response =  await utils.dbQuery(sql, value)

    }
    if ( nextID === undefined ){

        sql = 'SELECT * FROM gallery ORDER BY addTime DESC LIMIT 20'
        response =  await utils.dbQuery(sql)

    }

    let results = []

    for ( let i in response ){

        results.push({
            id: response[i]['id'],
            src: response[i]['src'],
            remarks: response[i]['remarks'],
            tag: response[i]['tag'],
            time: response[i]['addTime'],
        })

    }

    context.response.body = utils.send(1, '', results, true)



}