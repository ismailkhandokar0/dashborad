
const router = require('express').Router()
const {
    dashboardGetConrtol,
    createProfileGetContorl
} = require('../controll/dashboardConroll')
const {authenticate} = require('../middleware/authMiddleware')


router.get('/',authenticate,dashboardGetConrtol)

router.get('/create-profile',authenticate,createProfileGetContorl)





module.exports = router