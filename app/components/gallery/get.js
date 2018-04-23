module.exports = async context => {

    let nextID = context.request.body.next || undefined

    const sequelize = require('sequelize')
    const galeryDB = await db.import('../../dbTable/gallery.js')
    await galeryDB.sync({alter: true})
    const Op = sequelize.Op

    let all = await galeryDB.count()
    let next = all - parseInt(nextID, 10)
    let response

    if ( nextID !== undefined ){

        response = await galeryDB.findAll({
            where: {
                id: {
                    [Op.lt]: nextID
                },
                survival: 1
            },
            limit: 20,
            order: [
                ['addTime', 'DESC']
            ]
        })

    }
    if ( nextID === undefined ){

        response = await galeryDB.findAll({
            where: {
                survival: 1
            },
            limit: 20,
            order: [
                ['addTime', 'DESC']
            ]
        })

    }

    let results = []

    for ( let i in response ){

        results.push({
            id: response[i]['id'],
            thumbnail: response[i]['thumbnail'],
            src: response[i]['src'],
            remarks: response[i]['remarks'],
            tag: response[i]['tag'],
            time: response[i]['addTime'],
        })

    }


    if ( response[0] === undefined ){
        context.response.body = utils.send(0, '无更多', '', true)
    }
    if ( response[0] !== undefined ){
        context.response.body = utils.send(1, '', results, true)
    }


}