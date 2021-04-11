// userid,  title, body, thubnail, createAt, comment, replies

let {Schema,model} = require('mongoose')

let postSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    thubnail:String,
    readTime:String,
    comment:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[Schema.Types.ObjectId],
    dislikes:[Schema.Types.ObjectId],

},{timestamps:true})

let Post = model('Post',postSchema)

module.exports = Post