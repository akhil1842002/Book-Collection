const {main} = require('../db/connect')

const editbook = async (req,res) => {
    const splitId = req.params.id
    const post_id = splitId.split(':')[1]
    const database = await main()
    const dataCollection = await database.db('Book-Directory').collection('books')
    const allData = await dataCollection.findOne({post_id:post_id})
    res.json({data:allData})
}

module.exports = {
    editbook
}