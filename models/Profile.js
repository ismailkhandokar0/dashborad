
//userid, name profilepic, title,bio, link:{},post([]),bookmark([])

let{Schema,model} = require('mongoose')

let profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        maxlength:100
    },
    bio:{
        type:String,
        maxlength:500
    },
    links:{
        website:String,
        github:String,
        facebook:String,
        twitter:String
    },
    profilePics:String,
    post:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookmark:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

let Profile = model('Profile',profileSchema)
module.exports = Profile