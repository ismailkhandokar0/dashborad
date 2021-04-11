
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const errorFormat = require('../utility/errorFormat')
const Flash = require('../utility/Flash')


exports.signupGetControl = (req,res,next) =>{
    res.render('pages/auth/signup',
    {
        title:'Signup Page',
        error:{},
        value:{},
        flashMessage:Flash.getMessage(req)
    })
}

exports.signupPostControl =async (req,res,next) =>{
    const {username,email,password} = req.body

    let haspassword =await bcrypt.hash(password,11)

    let errors = validationResult(req).formatWith(errorFormat)

    if(!errors.isEmpty()){

        req.flash('fail','Please fillup required form')

        return res.render('pages/auth/signup',{
            title:'Error Occoured',
            error:errors.mapped(),
            value:{
                username,
                email,
                password
            },
            flashMessage:Flash.getMessage(req)
        })
    }

    try{



        let user = new User({
            username,
            email,
            password:haspassword
        })

        let createdUser = await user.save()
        console.log(createdUser)
        req.flash('success','Succesfully Singup ')
        res.redirect('/auth/login')
    }catch(e){
        console.log(e)
        next(e)
    }

}

exports.loginGetControl = (req,res,next) =>{
    
    res.render('pages/auth/login',{
        title:'Login Page',
        error:{},
        value:{},
        flashMessage:Flash.getMessage(req)
    })
}

exports.loginPostControl = async (req,res,next) =>{
    let {email,password} = req.body
    
    let errors = validationResult(req).formatWith(errorFormat)
    if(!errors.isEmpty()){

        req.flash('fail','Invalid Credential')

        return res.render('pages/auth/login',{
            title:'Error Occoured',
            error:errors.mapped(),
            value:{},
            flashMessage:Flash.getMessage(req)
        })
    }
    
    try{
        
        let user = await User.findOne({email})
        if(!user){
            return  res.render('pages/auth/login',{
                title:'Error Occoured',
                error:{
                    email:'User Not Founds'
                },
                value:{
                    email
                },
                flashMessage:Flash.getMessage(req)
            })
        }

        let matched = await bcrypt.compare(password,user.password)
        if(!matched){
            return res.render('pages/auth/login',{
                title:'Password Error',
                error:{
                    password:'Password Does Not Matched'
                },
                value:{
                    email
                },
                flashMessage:Flash.getMessage(req)
            })
        }

        req.session.isLoggedIn = true,
        req.session.user = user
        req.session.save(err =>{
            if(err){
                console.log(err)
                return next()
            }
            req.flash('success','successfully login ')
            res.redirect('/dashboard')
        })


    }catch(e){
        console.log(e)
        next(e)
    }
}

exports.logout = (req,res,next) =>{
    
    req.session.destroy(err =>{
        console.log(err)
    })
    
    res.redirect('/auth/login')
    
}