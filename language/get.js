const getLanuage = async (context) => {

    let form = context.request.body.fields === null ? false : context.request.body.fields

    let lang = form.lang

    const dbQuery = require(appPath + '/plug/dbQuery')

    const data = await dbQuery("SELECT keyword, cn FROM language")

    let results = {}

    for ( let r in data ){

        let key = data[r].keyword
        let value = data[r].cn

        results[key] = value

    }

    // console.log(JSON.stringify(results))
    context.body = JSON.stringify(results)
    // context.response.body = JSON.stringify(results)



}
module.exports = getLanuage