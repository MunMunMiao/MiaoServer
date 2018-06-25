class mongo {

    async link(){

        const MongoClient = require('mongodb').MongoClient

        const mongo = await MongoClient.connect('mongodb://127.0.0.1:2777', (err, data) => {
            console.log(err)
            console.log(data.db)
        })

    }

}

module.exports = mongo