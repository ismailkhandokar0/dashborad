
const authRoute = require('./authRoute')
const dashboard = require('./dashboardRoute')
const Flash = require('../utility/Flash')
const playRoute = require('../playground/play-mul')
const uploadRoute = require('./uploadRoute')



const router = [
    {
        path:'/',
        handler:(req,res,next) =>{
            res.render('pages/Home',{title:'Home Page',flashMessage:Flash.getMessage(req)})
        }
    },
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/dashboard',
        handler:dashboard
    },
    {
        path:'/play',
        handler:playRoute
    },
    {
        path:'/uploads',
        handler:uploadRoute
    }
]

module.exports = app => {
    router.forEach(route =>{
        if(route.path === '/'){
            app.get(route.path,route.handler)
        }else{
            app.use(route.path,route.handler)
        }

        
    })
}