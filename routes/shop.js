const router = require('express').Router()
const path = require('path')
const rootDir = require('../util/path')


const getIndexController = require('../controllers/shop').getIndex
const getProductsController = require('../controllers/shop').getProducts
const getProductController = require('../controllers/shop').getProduct
const getCartController = require('../controllers/shop').getCart
const postCartController = require('../controllers/shop').postCart
const getOrdersController = require('../controllers/shop').getOrders
const getCheckoutController = require('../controllers/shop').getCheckout



router.get('/',getIndexController)

router.get('/cart',getCartController)
router.post('/cart',postCartController)
router.get('/orders',getOrdersController)
router.get('/products',getProductsController)
router.get('/products/:id',getProductController)
router.get('/checkout',getCheckoutController)

module.exports = router