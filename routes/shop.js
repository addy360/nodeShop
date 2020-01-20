const router = require('express').Router()
const path = require('path')
const rootDir = require('../util/path')

const adminData = require('./admin').products


router.get('/',(req, res, next)=>{
	let data = {
		products:adminData,
		pageTitle:'Products',
		path : '/'
	}
	res.render('shop',data)

})

module.exports = router