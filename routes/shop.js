const router = require('express').Router()
const path = require('path')
const rootDir = require('../util/path')


const getIndexController = require('../controllers/shop').getIndex
const getProductsController = require('../controllers/shop').getProducts
const getCartController = require('../controllers/shop').getCart
const getOrdersController = require('../controllers/shop').getOrders
const getCheckoutController = require('../controllers/shop').getCheckout



router.get('/',getIndexController)

router.get('/cart',getCartController)
router.get('/orders',getOrdersController)
router.get('/products',getProductsController)
router.get('/checkout',getCheckoutController)

module.exports = router