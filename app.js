require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const morgan = require('morgan')
const directroy = require('./route/directory')
const mainMiddleware = require('./middleware/mainMidlleware')
const configure = require('./config/config')
const config = require('config')



const app = express()

//ejs engine
app.set('view engine','ejs')

console.log(app.get('env'))
if(app.get('env') === 'development'){
    app.use(morgan('dev'))
}

// auto env name seletion 
console.log(config.get('name'))

// middleware 
mainMiddleware(app)

// path directory 
directroy(app)





const PORT = process.env.PORT || 3109
mongoose.connect(`mongodb+srv://${config.get('db_username')}:${config.get('db_password')}@cluster0.vn7sd.mongodb.net/<dbname>?retryWrites=true&w=majority`,{useNewUrlParser:true})
    .then(() =>{
        console.log(chalk.green('Database Connected'))
        app.listen(PORT,() =>{
            console.log(chalk.green.inverse(`SERVER IS RUNNING ${PORT}`))
        })
    })
    .catch(err =>{
        console.log(err)
    })