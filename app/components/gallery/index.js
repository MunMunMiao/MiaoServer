class gallery {

    async del(context){

        if ( userData.status === 0 || userData.content.root !== 1 ){
            context.response.body = await utils.send(0, '没有权限', '', true)
            return
        }

        let id = context.request.body.id || undefined

        const galeryDB = Models.gallery
        await galeryDB.sync({alter: true})


        let response = await galeryDB.update({
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

        let nextID = context.request.body.next || undefined

        const sequelize = require('sequelize')
        const galeryDB = Models.gallery
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

    async push(context){

        if ( global.userData.status === 0 ){ return }

        const galeryDB = Models.gallery
        await galeryDB.sync({alter: true})


        let form = context.request.body.fields === null ? false : context.request.body.fields

        let link = JSON.parse(form.link)

        if ( link.length === 0 ){
            context.response.body = utils.send(0, '内容为空', '', true)
            return
        }


        // 判断是哪个网站的图片
        function processing(url) {

            let is = ''
            let org
            let thumbnail

            if ( new RegExp('^(http://|https://)[a-zA-Z0-9-_]*.[sina]*[a-zA-Z-_]*.[a-zA-Z]*\/', 'ig').test(url) ){
                is = 'weibo'
            }
            // if ( new RegExp('^(http://|https://)[a-zA-Z0-9-_]*\.[instagram]*[a-zA-Z-_]*\.[a-zA-Z]*\/', 'ig').test(url) ){
            //     is = 'instagram'
            // }

            // 去掉http和https然后对相应的链接做修改，比如说weibo的，可以修改large，换成mw1024，这样预览图就是显示小的了
            if ( is === 'weibo' ){
                org = url.replace( new RegExp('^(http:|https:)', 'ig'), '' )
                thumbnail = org.replace( new RegExp('large', 'ig'), 'mw690' )
            }else {
                org = url.replace( new RegExp('^(http:|https:)', 'ig'), '' )
                thumbnail = org
            }

            return {
                org: org,
                thumbnail: thumbnail
            }


        }


        for ( let index in link ){

            let src = link[index].images

            let url = await processing(src)
            let count = await galeryDB.count({
                where: {
                    src: url.org
                }
            })


            // 数据库未存在
            if ( count === 0 ){
                await galeryDB.create({
                    owner: userData.content.id,
                    thumbnail: url.thumbnail,
                    src: url.org,
                    remarks: '',
                    tag: '',
                    addTime: new Date().getTime(),
                    survival: 1
                })
            }

        }

        context.response.body = utils.send(1, '添加成功', '', true)

    }

}

module.exports = gallery