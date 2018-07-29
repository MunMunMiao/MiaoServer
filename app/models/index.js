class Models {

    async setModels(app){

        const sequelize = require('sequelize')
        const files = await this.readModels()

        global.Models = {}
        global.Models._Op = sequelize.Op

        app.context.Models = {}
        app.context.Models._Op = sequelize.Op

        files.forEach((value, key, arr) => {

            global.Models[key] = utils.db().import( value )
            app.context.Models[key] = utils.db().import( value )

        })

    }

    async readModels(){

        const fs = require('fs')
        const modelsPath = __dirname + '/db/'

        return new Promise( async (resolve, reject)=>{

            await fs.readdir(
                modelsPath,
                (err, data) => {

                    if (err){
                        resolve(err)
                        return
                    }

                    const map = new Map()

                    for ( let i in data ){

                        let name = data[i].match(/^[0-9A-Za-z]*/gi)
                        map.set(
                            name,
                            modelsPath + data[i]
                        )

                    }

                    resolve(map)

                }
            )

        })

    }

}

module.exports = Models