
// username, email, password, profile, 

let {Schema,model} = require('mongoose')

let userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref: 'Porfile'
    },
    profilePics:{
        type:String,
        default:'/uploads/default.jpg'
    }
},{timestamps:true})

let User = model('User',userSchema)
module.exports = User