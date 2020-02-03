const path = require('path')
const express = require('express')
const {check, body} = require('express-validator')


const rootDir = require('../util/path')
const getAdminController = require('../controllers/admin').getAddProduct
const postAdminController = require('../controllers/admin').postAddProduct
const adminController = require('../controllers/admin').getProducts
const editAdminController = require('../controllers/admin').getEditProduct
const editPostController = require('../controllers/admin').postEditProduct
const deleteAdminController = require('../controllers/admin').postDeleteProduct
const isAuth = require('../middleware/is-auth')
const can = require('../middleware/can')

const router = express.Router()


router.get('/add-product',isAuth,getAdminController)

router.get('/products' ,adminController)

router.get('/edit-product/:id', can, editAdminController)
router.post('/edit-product/', can, editPostController)

router.post('/add-product',[
		body('title','Product can not have an empty title')
		.isLength({min:1}),
		body('price','Product can not have an empty price Tag')
		.isLength({min:1}),
		body('description','Product can not have an empty description')
		.isLength({min:1}),
		body('imgUrl','Product can not have an empty image')
		.isLength({min:1}),
		
	], can,postAdminController)
router.post('/delete-product', can,deleteAdminController)

exports.router= router
