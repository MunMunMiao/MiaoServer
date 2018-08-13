class gallery {

    async del(context){

        let key = context.request.query.key || undefined

        let response = context.Models.gallery.update({
            survival: 0
        },{
            where: {
                key: key
            }
        })


        if ( response[0] !== 1 ){
            context.response.body = await utils.send(1, '删除成功', '', true)
        }
        if ( response[0] === 1 ){
            context.response.body = await utils.send(0, '删除失败', '', true)
        }

    }

    async get(context){

        let nextID = context.request.query.next || undefined

        const OSS = new context.oss()
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
                url: await OSS.signatureUrl('/images/' + response[i]['key'], 'style/gallery'),
                key: response[i]['key'],
                tones: response[i]['tones'],
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

    async isEmpty(context){

        let md5 = context.request.query.md5

        let count = await context.Models.gallery.count({
            where: {
                md5: md5
            }
        })

        if ( count === 0 ){
            context.response.body = context.utils.send(1, null, null, true)
        }

        if ( count > 0 ){
            context.response.body = context.utils.send(0, null, null, true)
        }

    }

    async push(context){

        let key = context.request.body.key
        let md5 = context.request.body.md5
        let uid = context.userData.content.id
        const gallery = context.Models.gallery

        let response = gallery
            .count({
                where: {
                    md5: md5
                }
            })
            .then(async r => {

                if ( r === 0 ){

                    const oss = new context.oss()
                    let tones = await oss.getImageTones(key)

                    return gallery.create({
                        owner: uid,
                        key: key,
                        md5: md5,
                        tones: tones,
                        time: new Date().getTime(),
                        survival: 1
                    })

                }
                if ( r === 1 ){

                    return null

                }

            })

        if ( response === null ){
            context.response.body = utils.send(0, null, null, true)
        }else {
            context.response.body = utils.send(1, null, null, true)
        }

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
            url: await OSS.signatureUrl('/images/' + response.key, 'style/org'),
            key: response.key,
            tones: response.tones,
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