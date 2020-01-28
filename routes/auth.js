const router = require('express').Router()
const loginController = require('../controllers/auth').login
const postLoginController = require('../controllers/auth').postLogin
const postLogoutController = require('../controllers/auth').postLogout

router.get('/login',loginController)
router.post('/login',postLoginController)
router.post('/logout',postLogoutController)


module.exports = router