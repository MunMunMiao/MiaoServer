const exit = async (context) => {

    await context.cookies
        .set('uid', '', {
            expires: new Date(0)
        })
        .set('token', '', {
            expires: new Date(0)
        })

    context.response.body = await sendApiData(1, '已退出', '')

}
module.exports = exit