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
        let uid = context.userData.content.uid
        const Op = context.Models._Op
        let all = await context.Models.gallery.count()
        let next = all - parseInt(nextID, 10)
        let response

        if ( nextID !== undefined ){

            response = await context.Models.gallery.findAll({
                where: {
                    id: {
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

        console.log(key, uid)

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

    async getImageInfo(context){

        let id = context.request.body.id || undefined

        if ( id === undefined ){
            context.response.body = utils.send(0, '', '', true)
            return
        }

        const gallery = Models.gallery
        const response = await gallery.findOne({
            where: {
                id: id
            }
        })

        let results = {
            id: response.id,
            thumbnail: response.thumbnail,
            src: response.src,
            remarks: response.remarks,
            tag: response.tag,
            time: response.addTime
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