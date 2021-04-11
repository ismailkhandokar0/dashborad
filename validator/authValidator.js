
const {body} = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.signupValidator = [
    body('username')
        .not()
        .isEmpty().withMessage('Username Can Not Be Empty')
        .isLength({min:4,max:15}).withMessage('Username Contains 4 To 15 Charecter')
        .custom(async username =>{
            let user  = await User.findOne({username})
            if(user){
                return Promise.reject('User Already Exits')
            }
        })
        .trim()

    ,body('email')
        .isEmail().withMessage('Provide A Valid Email')
        .custom(async email =>{
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('Email Already Exits')
            }
        })
        .normalizeEmail(),

    body('password')
        .isLength({min:5}).withMessage('Password Needs Minimum 5 Charecter')

    ,body('confirmPassword')
        .custom((confirm,{req}) =>{
            if(confirm !== req.body.password){
                throw new Error('Password Does not Matched')
            }
            return true
        })
        
]



exports.loginValidator = [
    body('email')
        .not()
        .isEmpty().withMessage('Email Can Not Be Empty')

    ,body('password')
        .not()
        .isEmpty().withMessage('Password Can Not Empty')
        
]

