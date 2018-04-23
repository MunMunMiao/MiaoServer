module.exports = async (context, send) => {

    let lang = context.request.body.lang

    const languageDB = await db.import('../../dbTable/language.js')
    await languageDB.sync({alter: true})

    let response

    if ( lang === undefined ){
        response = await languageDB.findAll()
    }
    if ( lang !== undefined ){
        response = await languageDB.findAll({
            attributes: ['keyword', lang]
        })
    }

    context.response.body = await utils.send(1, '', response, true)

}