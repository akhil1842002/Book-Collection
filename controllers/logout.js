const {main} = require('../db/connect')

const logout = async (req,res) => {
    const cook = req.cookies
    
    return res.cookie('access_token',"ha ha token losted").send("Log put")

}

module.exports = {
    logout
}