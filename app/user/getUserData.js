const getUserData = async (context) => {

    let userData = await require('./checkUser')(context)
    if ( userData.status === 0 ){ return }

    let results = {}

    results['uid'] = userData.content.id || undefined
    results['admin'] = userData.content.admin || undefined
    results['root'] = userData.content.root || undefined
    results['portrait'] = userConfig.path.resource + userData.content.portrait || undefined
    results['gender'] = userData.content.gender || undefined
    results['nickname'] = userData.content.nickname || undefined

    context.response.body = sendApiData(1, '', results, true)

}
module.exports = getUserData