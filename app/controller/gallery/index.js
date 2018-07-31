class gallery {

    async del(context){

        let id = context.request.query.id || undefined

        let response = await context.Models.gallery.update({
            survival: 0
        },{
            where: {
                id: id
            }
        })

        if ( response[0] !== 1 ){
            context.response.body = await utils.send(0, '删除成功', '', true)
        }
        if ( response[0] === 1 ){
            context.response.body = await utils.send(1, '删除失败', '', true)
        }

    }

    async get(context){

        let nextID = context.request.query.next || undefined

        const OSS = new context.oss(context)
        let uid = userData.content.id
        const Op = context.Models._Op
        let response

        if ( nextID !== undefined ){

            response = await context.Models.gallery.findAll({
                where: {
                    time: {
                        [Op.lt]: nextID
                    },
                    owner: uid,
                    survival: 1
                },
                limit: 20,
                order: [
                    ['time', 'DESC']
                ]
            })

        }
        if ( nextID === undefined ){

            response = await context.Models.gallery.findAll({
                where: {
                    survival: 1
                },
                limit: 20,
                owner: uid,
                order: [
                    ['time', 'DESC']
                ]
            })

        }

        let results = []

        for ( let i in response ){

            results.push({
                id: response[i]['id'],
                url: await OSS.signatureUrl(response[i]['key'], 'style/gallry'),
                key: response[i]['key'],
                remarks: response[i]['remarks'],
                tag: response[i]['tag'],
                time: response[i]['time'],
            })

        }


        if ( response[0] === undefined ){
            context.response.body = utils.send(0, '无更多', '', true)
        }
        if ( response[0] !== undefined ){
            context.response.body = utils.send(1, '', results, true)
        }

    }

    async push(context){

        let key = context.request.body.key
        let uid = context.userData.content.id

        let have = await context.Models.gallery.count({
            where: {
                key: key
            }
        })

        await context.Models.gallery.create({
            owner: uid,
            key: key,
            time: new Date().getTime(),
            survival: 1
        })

        context.response.body = utils.send(1, 'ok', null, true)

    }

    async imageInfo(context){

        let key = context.request.query.key || undefined
        const OSS = new context.oss(context)

        if ( key === undefined ){
            context.response.body = utils.send(0, '', '', true)
            return
        }

        const response = await Models.gallery.findOne({
            where: {
                key: key
            }
        })

        let results = {
            id: response.id,
            url: await OSS.signatureUrl(response.key, 'style/org'),
            key: response.key,
            remarks: response.remarks,
            tag: response.tag,
            time: response.time
        }


        if ( response === undefined ){
            context.response.body = utils.send(0, '', '', true)
        }
        if ( response !== undefined ){
            context.response.body = utils.send(1, '', results, true)
        }

    }

}

module.exports = gallery