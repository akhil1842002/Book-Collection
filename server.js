const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
require('dotenv').config()
const {userCheck} = require('./middleware/userCheckAuth')
const {main} = require('./db/connect')
const {join} = require('./controllers/join')
const {auth} = require('./controllers/auth')
const {login} = require('./controllers/login')
const {addbook} = require('./controllers/addbook')
const {allbook} = require('./controllers/allbook')
const {dashboard} = require('./controllers/dashboard')
const {singlebook} = require('./controllers/singlebook')
const {editbook} = require('./controllers/editbook')
const {editBookData} = require('./controllers/editBookData')
const {deleteBook} = require('./controllers/deleteBook')
const {logout} = require('./controllers/logout')
const app = express()

Port = process.env.PORT || 6000

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
// app.use(userCheck) 

app.get('/', ((req,res) => {
    res.sendFile(path.join(__dirname,'public','join.html'))
}))

app.get('/auth/:token',auth)

app.post('/join.html',join)

app.post('/login.html',login)

app.post('/addbook.html',userCheck,addbook)

app.get('/books/allbook.html',userCheck,allbook)

app.get('/data/dashboard.html',userCheck,dashboard)

app.get('/singlebook/:id',userCheck,singlebook)

app.get('/edit/addbook/:id',userCheck,editbook) 

app.post('/edit/data/addbook/:id',userCheck,editBookData)

app.delete('/delete/singlebook/:id',userCheck,deleteBook)

app.get('/user/logout.html',userCheck,logout)


const start = async () => {
    try {
        app.listen(Port,() => console.log(`server is running on ${Port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
