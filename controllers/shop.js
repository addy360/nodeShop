const Product = require('../models/Product')



exports.getProducts = (req, res, next)=>{
	Product.fetchAll((prod)=> {
		let data = {
		products:prod,
		pageTitle:'All products',
		path : 'ptoducts'
	}
	res.render('shop/product-list',data)
	})
	

}

exports.getIndex=(req,res,next)=>{
	Product.fetchAll((prod)=> {
		let data = {
		products:prod,
		pageTitle:'Products',
		path : '/'
	}
	res.render('shop/index',data)
	})
	
}

exports.getCart = (req,res,next)=>{
	let data = {
		path: '/cart',
		pageTitle:'your cart'
	}
	res.render('shop/cart' , data)
}

exports.getOrders = (req,res,next)=>{
	let data = {
		path: '/orders',
		pageTitle:'your orders'
	}
	res.render('shop/cart' , data)
}

exports.getCheckout = (req,res,next)=>{
	let data = {
		path: '/checkout',
		pageTitle:'Checkout'
	}
	res.render('shop/checkout' , data)
}

