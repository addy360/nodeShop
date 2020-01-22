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
	Cart.getAllCartProducts(cart=>{
		const productsInCart = []
		Product.fetchAll(products=>{
			for(product of products){
				const prod = cart.products.find(p=>p.id===product.id)
				if (prod) {
					productsInCart.push({product,qty:prod.qty})
				}
			}
			console.log(productsInCart)
			let data = {
				path: '/cart',
				pageTitle:'your cart',
				cart:productsInCart
			}
			res.render('shop/cart' , data)
		})
	})
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

exports.deleteCart=(req,res,next)=>{
	const id = req.body.id
	Product.fetchOneById(id,product=>{
		Cart.deleteFromCart(id,product.price)
		res.redirect('/cart')
	})
}

