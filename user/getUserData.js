const getUserData = async (context) => {

    let userData = await require(appPath + '/user/checkUser')(context)

    let results = {}

    results['uid'] = userData.content.id || undefined
    results['admin'] = userData.content.admin || undefined
    results['root'] = userData.content.root || undefined
    results['portrait'] = userData.content.portrait || undefined
    results['gender'] = userData.content.gender || undefined
    results['nickname'] = userData.content.nickname || undefined

    context.response.body = sendApiData(1, '', results, true)

}
module.exports = getUserData