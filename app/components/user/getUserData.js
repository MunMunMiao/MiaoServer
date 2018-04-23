const getUserData = async context => {

    if ( global.userData.status === 0 ){
        context.response.body = await sendApiData(0, '请登录', '', true)
        return
    }

    let results = {}

    results['uid'] = global.userData.content.id || undefined
    results['admin'] = global.userData.content.admin || undefined
    results['root'] = global.userData.content.root || undefined
    results['portrait'] = global.userConfig.path.static + global.userData.content.portrait || undefined
    results['gender'] = global.userData.content.gender || undefined
    results['nickname'] = global.userData.content.nickname || undefined

    context.response.body = sendApiData(1, '', results, true)

}
module.exports = getUserData