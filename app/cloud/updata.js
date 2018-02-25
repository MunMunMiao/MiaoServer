const updata = async context => {

    let files = context.request.body.files.file === null ? false : context.request.body.files.file

    let getTypeName = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    }

    const fs = require("fs")
    let fileInfo = []

    if ( files instanceof Array ){

        for ( let f in files ){

            fileInfo.push({
                size: files[f]['size'],
                path: files[f]['path'],
                name: files[f]['name'],
                type: files[f]['type'],
                typeName: await getTypeName(files[f]['name']),
                lastModifiedDate: new Date(files[f]['lastModifiedDate']).getTime(),
            })

            let oldPath = files[f]['path']
            let newPath = global.userConfig.path.cloud + files[f]['name']

            await fs.rename(oldPath, newPath, ()=>{})

            context.response.body = await sendApiData(1, '上传完成', fileInfo, true)

        }


    }else{

        fileInfo.push({
            size: files['size'],
            path: files['path'],
            name: files['name'],
            type: files['type'],
            typeName: await getTypeName(files['name']),
            lastModifiedDate: new Date(files['lastModifiedDate']).getTime(),
        })

        let oldPath = files['path']
        let newPath = global.userConfig.path.cloud + files['name']

        await fs.rename(oldPath, newPath, ()=>{})

        context.response.body = await sendApiData(1, '上传完成', fileInfo, true)

    }



}
module.exports = updata