const getLanuage = async (context) => {

    let form = context.request.body.fields || null

    let lang = form.lang

    if ( form.lang === null|| form.lang === undefined ){
        context.response.type = 403
        return
    }

    let sql = "SELECT keyword, ?? FROM language"
    let value = [lang]
    let data = await dbQuery(sql, value)

    let results = {}

    for ( let r in data ){

        let key = data[r].keyword
        let value = data[r][lang]

        results[key] = value

    }

    context.response.body = await sendApiData(1, '', results, true)



}
module.exports = getLanuage