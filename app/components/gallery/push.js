module.exports = async context => {

    if ( global.userData.status === 0 ){ return }

    const galeryDB = await db.import('../../dbTable/gallery.js')
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