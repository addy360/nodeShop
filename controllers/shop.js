const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Order = require('../models/Order')



exports.getProducts = (req, res, next)=>{
	Product.findAll()
	.then((product)=>{
		let data = {
		products:product,
		pageTitle:'All products',
		path : '/products'
	}
	res.render('shop/product-list',data)
	})
	.catch(err=>console.log(err))
	

}

exports.getProduct = (req,res,next)=>{
	let productId = req.params.id
	Product.findAll({where:{id:productId}})
	.then(row=>{
		console.log(row)
		let data = {
		product:row[0],
		pageTitle:'Product Details',
		path : ''
	}
		res.render('shop/product-item',data)
	})
	.catch(err=>console.log(err))
}

exports.getIndex=(req,res,next)=>{
	Product.findAll()
	.then((product)=> {
		let data = {
		products:product,
		pageTitle:'Products',
		path : '/'
	}
	res.render('shop/index',data)
	})
	.catch(err=>console.log(err))
	
}

exports.getCart = (req,res,next)=>{
	req.user.getCart()
	.then(cart=>{
		return cart.getProducts()
	})
	.then(product=>{
		console.log(product)
		let data = {
				path: '/cart',
				pageTitle:'your cart',
				cart:product
			}
			res.render('shop/cart' , data)
	})
	.catch(err=>console.log(err))
}

exports.postCart= (req,res,next)=>{
	const productId = req.body.productId
	let fetchedCart = null
	req.user.getCart()
	.then(cart=>{
		fetchedCart = cart
		return cart.getProducts({where:{id:productId}})
	})
	.then(products=>{
		let product
		if (products.length>0) {
			product=products[0]
		}
		let qty = 1
		if (product) {
			oldQty = product.cartItem.qty
			qty = oldQty +1
			return fetchedCart.addProduct(product,{through:{qty:qty}})
		}
		return Product.findAll({where:{id:productId}})
		.then(products=>{
			fetchedCart.addProduct(products[0],{through:{qty:qty}})
		})

	})
	.then(data=>{
		res.redirect('/cart')
	})
}

exports.getOrders = (req,res,next)=>{
	req.user.getOrders({include:['products']})
	.then(orders=>{
		console.log(orders)
		let data = {
			path: '/orders',
			pageTitle:'your orders',
			orders
		}
		res.render('shop/orders' , data)
	})
	.catch(err=>{
		console.log(err)
	})
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
	req.user.getCart()
	.then(cart=>{
		return cart.getProducts({where:{id:id}})
	})
	.then(products=>{
		const product = products[0]
		return product.cartItem.destroy()
	})
	.then(data=>{
		console.log(data)
		res.redirect('/cart')
	})
	.catch(err=>console.log(err))
	
}

exports.postOrder=(req,res,next)=>{
	let products=null
	let cart=null
	req.user.getCart()
	.then(carts=>{
		cart=carts
		return carts.getProducts()
	})
	.then(data=>{
		products=data
		return req.user.createOrder()
	})
	.then(order=>{
		return order.addProducts(products.map(product=>{
			product.orderItem = {qty:product.cartItem.qty}
			console.log('QUANTITYYY\t\t\t'+ product)
			return product
		}))
	})
	.then(results=>{
		return cart.setProducts(null)
	})
	.then(results=>{
		res.redirect('/orders')
	})
	.catch(err=>console.log(err))
}

