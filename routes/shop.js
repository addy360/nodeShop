const router = require('express').Router()
const path = require('path')
const rootDir = require('../util/path')
const isAuth = require('../middleware/is-auth')


const getIndexController = require('../controllers/shop').getIndex
const getProductsController = require('../controllers/shop').getProducts
const getProductController = require('../controllers/shop').getProduct
const getCartController = require('../controllers/shop').getCart
const postCartController = require('../controllers/shop').postCart
const getOrdersController = require('../controllers/shop').getOrders
// const getCheckoutController = require('../controllers/shop').getCheckout
const deleteCartController = require('../controllers/shop').deleteCart
const postOrderController = require('../controllers/shop').postOrder



router.get('/',getIndexController)

router.get('/cart',isAuth,getCartController)
router.post('/cart',isAuth,postCartController)
router.post('/cart-delete',isAuth,deleteCartController)
router.post('/cart-clear',isAuth,postOrderController)
router.get('/orders',isAuth,getOrdersController)
router.get('/products',getProductsController)
router.get('/products/:id',getProductController)
// router.get('/checkout',getCheckoutController)

module.exports = router