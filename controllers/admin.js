const Product = require('../models/Product')

exports.getAddProduct = (req, res, next)=>{
	
	res.render('admin/add-product',{pageTitle:'Add product', path: 'admin/add-product'})
}

exports.postAddProduct=(req,res,next)=>{
	const title = req.body.title
	const imgUrl = req.body.imgUrl
	const description = req.body.description
	const price = req.body.price
	let product = new Product(title,imgUrl,description,price)
	product.save()
	res.redirect('/')
}

exports.getProducts = (req,res,next)=>{
	Product.fetchAll((prod)=> {
		let data = {
		products:prod,
		pageTitle:'Admin Products',
		path : 'admin/products'
	}
	res.render('admin/products',data)
	})
}
