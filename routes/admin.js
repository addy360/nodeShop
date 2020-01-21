const express = require('express')
const rootDir = require('../util/path')
const path = require('path')
const getAdminController = require('../controllers/admin').getAddProduct
const postAdminController = require('../controllers/admin').postAddProduct
const adminController = require('../controllers/admin').getProducts

const router = express.Router()


router.get('/add-product',getAdminController)

router.get('/products' ,adminController)

router.post('/add-product',postAdminController)

exports.router= router
