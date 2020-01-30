const express = require('express')
const rootDir = require('../util/path')
const path = require('path')
const getAdminController = require('../controllers/admin').getAddProduct
const postAdminController = require('../controllers/admin').postAddProduct
const adminController = require('../controllers/admin').getProducts
const editAdminController = require('../controllers/admin').getEditProduct
const editPostController = require('../controllers/admin').postEditProduct
const deleteAdminController = require('../controllers/admin').postDeleteProduct
const isAuth = require('../middleware/is-auth')

const router = express.Router()


router.get('/add-product',isAuth,getAdminController)

router.get('/products' ,adminController)

router.get('/edit-product/:id', editAdminController)
router.post('/edit-product/', editPostController)

router.post('/add-product',postAdminController)
router.post('/delete-product',deleteAdminController)

exports.router= router
