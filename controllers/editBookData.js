const {main} = require('../db/connect')

const editBookData = async (req,res) => {
    const splitId = req.params.id
    const post_id = splitId.split(':')[1]
    
    const title = req.body.title
    const author = req.body.author
    const description = req.body.description
    const year = req.body.year
    const page = req.body.page
    const link = req.body.link 

    try {
        const database = await main()
        const dataCollection = await database.db('Book-Directory').collection('books')
        const allData = await dataCollection.updateOne({post_id:post_id},{$set: {
        title:title,
        author:author,
        description:description,
        year:year,
        page:page,
        link:link
        }})
        res.json({success:true})
    } catch (error) {
        res.json({success:false})
    }

    
}

module.exports = {
    editBookData
}