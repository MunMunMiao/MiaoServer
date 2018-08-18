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

        let key = context.request.query.key || undefined

        const OSS = new context.oss()
        const gallery = context.Models.gallery
        const uid = userData.content.id
        const Op = context.Models._Op
        let response

        if ( key !== undefined ){

            response = await gallery
                .findOne({
                    attributes: [
                        'time'
                    ],
                    where: {
                        key: key
                    }
                })
                .catch(r => {
                    return null
                })
                .then(r => {

                    return gallery.findAll({
                        attributes: [
                            'key',
                            'tones',
                            'time',
                            'remarks',
                            'tag'
                        ],
                        where: {
                            time: {
                                [Op.lt]: r.time
                            },
                            owner: uid,
                            survival: 1
                        },
                        limit: 20,
                        order: [
                            ['time', 'DESC']
                        ]
                    })

                })
                .then(r => {

                    return r

                })

        }
        if ( key === undefined ){

            response = await gallery.findAll({
                attributes: [
                    'key',
                    'tones',
                    'time',
                    'remarks',
                    'tag'
                ],
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

        for ( let i in response ){

            response[i].url = await OSS.signatureUrl(
                '/images/' + response[i].key,
                'style/gallery'
            )

            response[i].blurry = await OSS.signatureUrl(
                '/images/' + response[i].key,
                'style/blurry'
            )

        }


        if ( response[0] === undefined ){
            context.response.body = utils.send(0, '无更多', '', true)
        }
        if ( response[0] !== undefined ){
            context.response.body = utils.send(1, '', response, true)
        }

    }

    async isEmpty(context){

        let md5 = context.request.query.md5

        let count = await context.Models.gallery.count({
            where: {
                md5: md5,
                survival: 1
            }
        })

        if ( count === 0 ){
            context.response.body = context.utils.send(1, null, null, true)
        }

        if ( count !== 0 ){
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
                    md5: md5,
                    survival: 1
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