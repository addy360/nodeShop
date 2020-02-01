const router = require('express').Router()
const loginController = require('../controllers/auth').login
const postLoginController = require('../controllers/auth').postLogin
const postLogoutController = require('../controllers/auth').postLogout
const signupController = require('../controllers/auth').signUp
const signupPostController = require('../controllers/auth').postSignUp
const resetController = require('../controllers/auth').getReset
const postResetController = require('../controllers/auth').postReset
const getTokenController = require('../controllers/auth').getToken
const postTokenController = require('../controllers/auth').postToken

// auth/
router.get('/login',loginController)
router.post('/login',postLoginController)
router.get('/signup',signupController)
router.post('/signup',signupPostController)
router.post('/logout',postLogoutController)
router.get('/reset', resetController)
router.post('/reset', postResetController)
router.get('/reset/:token', getTokenController)
router.post('/newpassword',postTokenController)


module.exports = router