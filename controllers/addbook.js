const {main} = require('../db/connect')
const uniqe = require('uniqid')

function titleCheck(titleInput){
    if(titleInput.length > 200 || titleInput == ""){
        return
    }else{
        return titleInput
    }
}

function authorCheck(authorInput){
    if(authorInput.length > 50 || authorInput == ""){
        return
    }else{
        return authorInput
    }
}

function descriptionCheck(descriptionInput){
    if(descriptionInput.length > 300 || descriptionInput == ""){
        return       
    }else{
        return descriptionInput
    }
}

function yearCheck(yearInput){
    const conIntiString = yearInput.toString()
    if(yearInput.match(/[a-zA-Z\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/) || conIntiString.length != 4 || yearInput == ""){
        return
    }else{
        return yearInput
    }
}

function pageCheck(pageInput){
    const conIntiString = pageInput.toString()
    if(pageInput.match(/[a-zA-Z\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/) || pageInput == ''){
        return
    }else{
        return pageInput
    }
}

function reviewCheck(reviewInput){
    if(reviewInput.match(/\\t\n .\/<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/) || reviewInput == '' || reviewInput == 300){
        return
    }else{
        return reviewInput
    }
}

const addbook = async (req,res) => {
    const imagedata = req.body.image
    const titleData = titleCheck(req.body.title) 
    const authorData = authorCheck(req.body.author) 
    const descriptionData = descriptionCheck(req.body.description) 
    const yearData = yearCheck(req.body.year) 
    const pageData = pageCheck(req.body.page) 
    const reviewData = reviewCheck(req.body.review) 
    const linkData = req.body.link

    const sendToServer = {
        post_id:uniqe(),
        image:imagedata,
        title:titleData,
        author:authorData,
        description:descriptionData,
        year:yearData,
        page:pageData,
        review:reviewData,
        link:linkData,
        timeOfUpdate: new Date(),
        'userId': req.userid
    }
    try {
        const database = await main()
        const dataCollection = await database.db('Book-Directory').collection('books')
        const data = await dataCollection.insertOne(sendToServer) 
        res.json({success:true})
    } catch (error) {
        if(error){
            res.json({success:false})
        }
    }
    
}

module.exports = {
    addbook
}

