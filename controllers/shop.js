const Product = require('../models/Product')
const Cart = require('../models/Cart')



exports.getProducts = (req, res, next)=>{
	Product.fetchAll((prod)=> {
		let data = {
		products:prod,
		pageTitle:'All products',
		path : '/products'
	}
	res.render('shop/product-list',data)
	})
	

}

exports.getProduct = (req,res,next)=>{
	let productId = req.params.id
	Product.fetchOneById(productId,product=>{
		let data = {
		product:product,
		pageTitle:'Product Details',
		path : ''
	}
		res.render('shop/product-item',data)
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

exports.postCart= (req,res,next)=>{
	productId = req.body.productId
	Product.fetchOneById(productId,product=>{
		Cart.addToCart(productId,product.price)
	})
	res.redirect('/cart')
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

