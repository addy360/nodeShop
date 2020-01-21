const Product = require('../models/Product')

exports.getAddProduct = (req, res, next)=>{
	
	res.render('admin/edit-product',{pageTitle:'Add product', path: 'admin/add-product',editMode:false})
}

exports.postAddProduct=(req,res,next)=>{
	const title = req.body.title
	const imgUrl = req.body.imgUrl
	const description = req.body.description
	const price = req.body.price
	let product = new Product(null, title,imgUrl,description,price)
	product.save()
	res.redirect('/')
}

exports.getEditProduct = (req, res, next)=>{
	let productId= req.params.id
	let editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/')
	}
	Product.fetchOneById(productId, product=>{
		console.log(product)
		if(!product) return res.redirect('/')
		let data ={
				pageTitle:'Edit product',
			 	path: 'admin/edit-product',
			 	editMode,
			 	product
			}
		
		res.render('admin/edit-product', data)
	})
}

exports.postEditProduct = (req, res, next)=>{
	const productId=req.body.productId
	const title=req.body.title
	const imgUrl=req.body.imgUrl
	const price=req.body.price
	const description=req.body.description
	const updatedProduct = new Product(productId,title,imgUrl,description,price)
	updatedProduct.save()
	res.redirect('/admin/products')
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
