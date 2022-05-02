const bcrypt = require('bcrypt');
const {main} = require('../db/connect')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function ValidateEmail(emailInput) {

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailInput.match(mailformat)) {
        return emailInput
    }
    else {
        return
    }
}

function ValidatePassword(passwordInput) {

    if (passwordInput.match(/[^A-Z]/) && passwordInput.match(/[^a-z]/) && passwordInput.match(/[^0-9]/) && passwordInput.length >= 10 && passwordInput.length <= 25) {
        return passwordInput
    }
    else {
        return
    }
}

async function login (req,res){
    let email = ValidateEmail(req.body.email)
    let password = ValidatePassword(req.body.password)

    if(!email || !password) return res.json({sucess:false,msg:"invalid credential"})

    // let database = await main()

    try {
        let database = await main()
        let dataCollection = await database.db('Book-Directory').collection('users')
        let user = await dataCollection.findOne({_id:email})
        const token = await jwt.sign({userid:user.userid},process.env.SECRET_KEY)
        if(!user){
            return res.json({status:'new',msg:'sign in first'})
        }
        if(!user.authenticated === true){
            return res.json({status:401,msg:'Click verifiacation Link From mail'})  
        }
        if(user._id  && await bcrypt.compare(password,user.password)){
            // return res.json({success:true,data:user,token})
            return res.cookie('access_token',token)
            .json({success:true,data:user})
        }
        else{
            res.json({status:400})
        }
        // return res.cookie('access_token',token)
    } catch (error) {
        res.json({err:'Internal Server Error'})
    }
}

module.exports = {
    login
}