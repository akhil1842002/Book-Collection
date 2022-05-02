const jwt = require('jsonwebtoken')
require('dotenv').config()

function userCheck(req,res,next) {
    // console.log(req.cookies);
    const token = req.cookies.access_token
    // console.log(token);
    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        const {userid} = decode

        if(!userid) return res.redirect('/join')

        req.userid = userid
        return next()

    }catch(e){ 
        console.log('erroer');
    }
    

   
}

module.exports = {
    userCheck
}