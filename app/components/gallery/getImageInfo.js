module.exports = async context => {

    let id = context.request.body.id || undefined

    let response = await utils.dbQuery('SELECT * FROM gallery WHERE id=?', id)

    let results = {}

    results.id = response[0].id
    results.thumbnail = response[0].thumbnail
    results.src = response[0].src
    results.remarks = response[0].remarks
    results.tag = response[0].tag
    results.time = response[0].addTime


    if ( results.id === undefined ){
        context.response.body = utils.send(0, '', '', true)
    }
    if ( results.id !== undefined ){
        context.response.body = utils.send(1, '', results, true)
    }


}