const router = require('express').Router()


const {
    signupGetControl,
    signupPostControl,

    loginGetControl,
    loginPostControl,

    logout
} = require('../controll/authControll')

const {
    signupValidator,
    loginValidator

} = require('../validator/authValidator')

const {
    unAuthenticate,
    authenticate
} = require('../middleware/authMiddleware')



router.get('/signup',unAuthenticate,signupGetControl)
router.post('/signup',signupValidator,signupPostControl)

router.get('/login',unAuthenticate,loginGetControl)
router.post('/login',loginValidator,loginPostControl)

router.get('/logout',logout)



module.exports = router