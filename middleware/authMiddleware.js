
const User = require('../models/User')

exports.bindWithUser = () =>{
    return async (req,res,next) =>{
        if(!req.session.isLoggedIn){
            return next()
        }

        try{
            let user =await User.findOne(req.session.user._id)
            req.user = user
            next()
        }catch(e){
            console.log(e)
            next(e)
        }
        

    }
}

exports.unAuthenticate = (req,res,next) =>{
    if(req.session.isLoggedIn){
       return  res.redirect('/dashboard')
    }
    next()
}

exports.authenticate =(req,res,next) =>{
    if(!req.session.isLoggedIn){
       return res.redirect('/auth/login')
    }
    next()
}