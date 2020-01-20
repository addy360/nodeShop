const express = require('express')
const rootDir = require('../util/path')
const path = require('path')
const getAddProductController = require('../controllers/product').getAddProduct
const postAddProductController = require('../controllers/product').postAddProduct

const router = express.Router()


router.get('/add-product',getAddProductController)

router.post('/add-product',postAddProductController)

exports.router= router
