const setUserPortrait = async context => {

    if ( global.userData.status === 0 ){ return }

    let files = context.request.body.files === null ? false : context.request.body.files

    const getTypeName = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    }
    const getName = (name) => {
        let a = name.replace(/(.+)[\\/]/, "");
        let b = a.replace(/\.\w+$/, "");
        return b;
    }

    let path = files.images.path
    let name = await getName(files.images.name)
    let typeName = await getTypeName(files.images.name)

    const crypto = require('crypto')

    let fileName = crypto.createHash('md5').update(name).digest('hex') + new Date().getTime() + '.png'
    let outPath = global.userConfig.path.tmp + fileName

    const gm = require('gm')
    const fs = require('fs')


    const convert = () => {
        return new Promise((resolve, reject)=>{

            gm(path)
                .resize(120)
                .quality(70)
                .noProfile()
                .setFormat('png')
                .write(outPath, async () => {

                    await fs.unlink(files.images.path, () => {})

                    resolve()

                })

        })
    }

    context.response.body = await convert().then(async ()=>{

            let sql = "UPDATE user SET portrait=? WHERE id=?"
            let value = [fileName, userData.content.id]

            let data = await dbQuery(sql, value)

            let results = {}

            for ( let i in data ){

                results[i] = data[i]

            }

            if (  results['affectedRows'] !== 1 ){

                return await sendApiData(0, '设置失败', results, true)

            }

            if (  results['affectedRows'] === 1 ){

                 return await sendApiData(1, '设置成功', results, true)

            }

    })


}
module.exports = setUserPortrait