const {main} = require('../db/connect')

const allbook = async (req,res) => {
    const user = req.userid
    try {
        const database = await main()
        const dataCollection = await database.db('Book-Directory').collection('books')
        const allData = await dataCollection.find({userId: {$nin: [user]}}).sort({timeOfUpdate: -1}).toArray()
        res.json({data:allData})
    } catch (error) {
        res.json({data:false})
    }
    
}

module.exports = {
    allbook
}