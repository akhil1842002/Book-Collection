const bcrypt = require('bcrypt');
const {main} = require('../db/connect')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodeMailer = require('nodemailer');
var uniqid = require('uniqid'); 

function ValidateName(nameInput) {

    let nameformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (nameInput.length <= 3 || nameInput.length > 50 || nameInput.match(nameformat) || nameInput.match(/[0-9]/)) {
        return
    } else {
        return nameInput
    }
}

function ValidateEmail(emailInput) {

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailInput.match(mailformat)) {
        return emailInput
    }
    else {
        return
    }
}

async function ValidatePassword(passwordInput) {

    if (passwordInput.match(/[^A-Z]/) && passwordInput.match(/[^a-z]/) && passwordInput.match(/[^0-9]/) && passwordInput.length >= 10 && passwordInput.length <= 25) {
        const salt = 10
        const hasedPassword = await bcrypt.hash(passwordInput, salt)
        return hasedPassword
    }
    else {
        return
    }
}

async function sendMail(token){

}

const join = async (req, res) => {

    let name = ValidateName(req.body.name)
    let email = ValidateEmail(req.body.email)
    let password = await ValidatePassword(req.body.password)
    let data = {name, _id: email, password ,authenticated:false}
    if(!data.name || !data._id || !data.password) return res.json({sucess:false,msg:"invalid credential"}) 

    let userid = uniqid()
    data.userid = userid

    try {
        const database = await main()
        const dataCollection = await database.db('Book-Directory').collection('users')
        await dataCollection.insertOne(data)
        const token = await jwt.sign({id:data._id},process.env.SECRET_KEY)

        async function sendMail(){
            let transporter = nodeMailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.EMAIL,
                    pass:process.env.PASSWORD
                }
            })
    
            let mailOPtions = await {
                from:process.env.EMAIL,
                to:data._id,
                subject:'Testing',
                html:`http://localhost:5000/auth/${token}`
            }
    
            await transporter.sendMail(mailOPtions,(err,info) => {
    
                if(err){
                    return err
                }else{
                    return info
                }
            })
            res.json({sucess:true,data:data,token:token})
        }
        sendMail()
        // res.cookie('access_cookie',token)
    } catch (error) {
        if(error.code === 11000){
            return res.json({sucess:11000})
        }else{
            return res.json({status:500})
        }
    }  
}


module.exports = {
    join
}