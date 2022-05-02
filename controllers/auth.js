const bcrypt = require('bcrypt');
const {main} = require('../db/connect')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const decoder = require('jwt-decode')
const { TokenExpiredError } = require('jsonwebtoken');


const auth = async (req,res) => {
    
    let getToken = req.params.token
    try {

        let verifyToken = jwt.verify(getToken,process.env.SECRET_KEY)
        if(!verifyToken){
            res.send('failed')
            return
        }
        let decodedToken = decoder(getToken)
        let decodedId = await decodedToken.id
        let database = await main()
        let dataCollection = await database.db('Book-Directory').collection('users')
        let findingTheUser = await dataCollection.updateOne({_id:decodedId},{$set:{authenticated:true}})
        res.redirect('http://localhost:5000/authenticate.html')
    } catch (error) {

        if(TokenExpiredError){
            return res.redirect('http://localhost:5000/authenticatefailed.html')
        }
       
    }
}

module.exports = {
    auth
}

