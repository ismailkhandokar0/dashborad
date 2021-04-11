
const Profile = require('../models/Profile')
const Flash = require('../utility/Flash')

exports.dashboardGetConrtol =async (req,res,next) =>{
    
    let profile = await Profile.findOne({user: req.user._id})

    try{
        if(profile){
            return res.render('pages/dashboard/dash',{
            title:'Dashboard',
            flashMessage: Flash.getMessage(req)
        })
        }

        res.redirect('/dashboard/create-profile')
         
    }catch(e){
        next(e)
    }
}

exports.createProfileGetContorl =async (req,res,next) =>{

    try{
        let profile = await Profile.findOne({user: req.user._id})

        if(profile){
           return  res.redirect('/dashboard/edit-profile')
        }
        res.render('pages/dashboard/create-profile',{
            title:'Create Profile',
            flashMessage:Flash.getMessage(req)
        })
    }catch(e){
        next(e)
    }
}
