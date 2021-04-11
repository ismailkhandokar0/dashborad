

const router = require('express').Router()
const Flash = require('../utility/Flash')
const upload = require('../middleware/uploadMiddleware')

router.get('/',(req,res,next) =>{
    res.render('playground/play-mul',{title:'Playground',flashMessage:Flash.getMessage(req)})
})

router.post('/',upload.single('fileISMAIL'),(req,res,next) =>{

    if(req.file){
        console.log(req.file)
    }

    res.redirect('/play')
})




module.exports = router