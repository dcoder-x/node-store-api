const express = require('express')
const { userSignin, userSignup,sellerSignin,sellerSignup } = require('../controllers/auth')
const authMiddleware = require('../middleware/jwt')
const router = express.Router()

router.route('/user/login').post(userSignin)
router.route('/user/register').post(userSignup)
router.route('/seller/login').post(sellerSignin)
router.route('/seller/register').post(sellerSignup)


module.exports = router