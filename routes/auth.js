const router = require('express').Router()
const { check, body } = require ('express-validator')

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
router.post('/login',[
		body('email','E-mail must be valid')
		.isEmail(),
		body('Password','Password must not be empty')
		.isLength({min:1})
	],postLoginController)
router.get('/signup',signupController)
router.post('/signup',[
	check('email','must be an e-mail')
	.isEmail(), 
	check('Password')
	.isLength({min:5})
	.withMessage('must be more than five characters'),
	body('Password2', 'passwordConfirmation field must have the same value as the password field')
    .custom((value, { req }) => value === req.body.Password)
	],signupPostController)
router.post('/logout',postLogoutController)
router.get('/reset', resetController)
router.post('/reset', postResetController)
router.get('/reset/:token', getTokenController)
router.post('/newpassword',postTokenController)


module.exports = router