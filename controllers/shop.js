const Product = require('../models/Product')
// const Cart = require('../models/Cart')
const Order = require('../models/Order')



exports.getProducts = (req, res, next)=>{
	Product.find()
	.then((product)=>{
		console.log(product);
		let data = {
		products:product,
		pageTitle:'All products',
		path : '/products',
		isAuth:req.session.isLoggedIn

	}
	res.render('shop/product-list',data)
	})
	.catch(err=>console.log(err))
	

}

exports.getProduct = (req,res,next)=>{
	let productId = req.params.id
	Product.findById(productId)
	.then(row=>{
		console.log(row)
		let data = {
		product:row,
		pageTitle:'Product Details',
		path : '',
		isAuth:req.session.isLoggedIn

	}
		res.render('shop/product-item',data)
	})
	.catch(err=>console.log(err))
}

exports.getIndex=(req,res,next)=>{
	Product.find()
	.then((product)=> {
		let data = {
		products:product,
		pageTitle:'Products',
		path : '/',
		isAuth:req.session.isLoggedIn,

	}
	res.render('shop/index',data)
	})
	.catch(err=>console.log(err))
	
}

exports.getCart = (req,res,next)=>{
	req.user
	.populate('cart.items.productId')
	.execPopulate()
	.then(user=>{
		const products = user.cart.items
		let data = {
				path: '/cart',
				pageTitle:'your cart',
				cart:products,
				isAuth:req.session.isLoggedIn

			}
			res.render('shop/cart' , data)
	})
	.catch(err=>console.log(err))
}

exports.postCart= (req,res,next)=>{
	const productId = req.body.productId
	// console.log(productId)
	let fetchedCart = null
	Product.findById(productId)
	.then(product=>{
		return req.user.addToCart(product)
	})
	.then(results=>{
		// console.log(results)
		res.redirect('/cart')
	})
	.catch(err=>console.log(err))
	// req.user.getCart()
	// .then(cart=>{
	// 	fetchedCart = cart
	// 	return cart.getProducts({where:{id:productId}})
	// })
	// .then(products=>{
	// 	let product
	// 	if (products.length>0) {
	// 		product=products[0]
	// 	}
	// 	let qty = 1
	// 	if (product) {
	// 		oldQty = product.cartItem.qty
	// 		qty = oldQty +1
	// 		return fetchedCart.addProduct(product,{through:{qty:qty}})
	// 	}
	// 	return Product.findAll({where:{id:productId}})
	// 	.then(products=>{
	// 		fetchedCart.addProduct(products[0],{through:{qty:qty}})
	// 	})

	// })
	// .then(data=>{
	// 	res.redirect('/cart')
	// })
}

exports.getOrders = (req,res,next)=>{
	Order.find({'user.userId':req.user._id})
	.then(orders=>{
		console.log(orders)
		let data = {
			path: '/orders',
			pageTitle:'your orders',
			orders,
			isAuth:req.session.isLoggedIn

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
		pageTitle:'Checkout',
		isAuth:req.session.isLoggedIn
		
	}
	res.render('shop/checkout' , data)
}

exports.deleteCart=(req,res,next)=>{
	const id = req.body.id
	req.user.deleteItemCart(id)
	.then(data=>{
		console.log(data)
		res.redirect('/cart')
	})
	.catch(err=>console.log(err))
	
}

exports.postOrder=(req,res,next)=>{
	req.user
	.populate('cart.items.productId')
	.execPopulate()
	.then(user=>{
		const products = user.cart.items.map(item=>{
			return {qty:item.qty,product:{...item.productId._doc}}
		})
		const order = new Order({
			user:{
				email:req.user.email,
				userId:req.user
			},
			products
		})
		return order.save()
	})
	.then(results=>{
		console.log(results)
		return req.user.clearCart()
	})
	.then(result=>{
		res.redirect('/orders')
	})
	.catch(err=>console.log(err))
}

