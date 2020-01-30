const router = require('express').Router()
const loginController = require('../controllers/auth').login
const postLoginController = require('../controllers/auth').postLogin
const postLogoutController = require('../controllers/auth').postLogout
const signupController = require('../controllers/auth').signUp
const signupPostController = require('../controllers/auth').postSignUp

router.get('/login',loginController)
router.post('/login',postLoginController)
router.get('/signup',signupController)
router.post('/signup',signupPostController)
router.post('/logout',postLogoutController)


module.exports = router