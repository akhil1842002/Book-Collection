const {MongoClient} = require('mongodb')
require('dotenv').config()

async function main(){
    const url = (process.env.MONGO_URI)
    const client = new MongoClient(url)
    try{
        await client.connect()
        return client
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    main
}