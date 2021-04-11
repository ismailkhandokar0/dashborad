const router = require('express').Router()
const {
    uploadContorlll
} = require('../controll/uploadContorl')
const upload = require('../middleware/uploadMiddleware')
const {authenticate} = require('../middleware/authMiddleware')

router.post('/profilePics',authenticate,upload.single('profilePics'),uploadContorlll)



module.exports = router