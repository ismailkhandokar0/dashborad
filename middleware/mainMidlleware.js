const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const setLocals = require('./setLocal')
const {bindWithUser} = require('../middleware/authMiddleware')
const flash = require('connect-flash')


// connect mongodb 
const store = new MongoDBStore({
    uri: 'mongodb+srv://ismailkhandokar0:01995576173@cluster0.vn7sd.mongodb.net/<dbname>?retryWrites=true&w=majority',
    collection: 'ourSession',
    expires:1000 * 60 * 60
  })

  


let middleWare = [
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret:process.env.SECRET_KEY || 'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store:store
    }),
    flash(),
    bindWithUser(),
    setLocals()
    
]


module.exports = app =>{
    middleWare.forEach(middle =>{
        app.use(middle)
    })
}
