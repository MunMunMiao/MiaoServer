const checkUser = async () => {

    const dbQuery = require(appPath + '/plug/dbQuery')

    let data = dbQuery('SELECT * FROM user WHERE id='+ uid +' LIMIT 1')

    console.log( data )


    return data

}
module.exports = checkUser