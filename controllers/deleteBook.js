const {main} = require('../db/connect')

const deleteBook = async (req,res) => {
    const splitId = req.params.id 
    const post_id = splitId.split(':')[1]

    try {
        const database = await main()
        const dataCollection = await database.db('Book-Directory').collection('books')
        const allData = await dataCollection.deleteOne({post_id:post_id})
        res.json({success:true})
    } catch (error) {
        res.json({success:false})
    }
}

module.exports = {
    deleteBook
}