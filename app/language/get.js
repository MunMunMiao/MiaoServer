module.exports = async (context, send) => {

    let form = context.request.body.fields || null

    let lang = form.lang

    if ( form.lang === null|| form.lang === undefined ){
        return
    }

    let sql = "SELECT keyword, ?? FROM language"
    let value = [lang]
    let data = await utils.dbQuery(sql, value)

    let results = {}

    for ( let r in data ){

        let key = data[r].keyword
        let value = data[r][lang]

        results[key] = value

    }

    if ( send == false ){
        return await sendApiData(1, '', results, false)
    }
    context.response.body = await sendApiData(1, '', results, true)



}