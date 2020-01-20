const router = require('express').Router()
const path = require('path')
const rootDir = require('../util/path')


const getProductsController = require('../controllers/product').getProducts



router.get('/',getProductsController)

module.exports = router