const Product = require('../models/Product')
const ObjectId = require('mongodb').ObjectID;


exports.getAddProduct = (req, res, next)=>{
	
	res.render('admin/edit-product',{pageTitle:'Add product', path: 'admin/add-product',editMode:false,isAuth:req.isLoggedIn
})
}

exports.postAddProduct=(req,res,next)=>{
	const userId = req.user
	const title = req.body.title
	const imgUrl = req.body.imgUrl
	const description = req.body.description
	const price = req.body.price
	let product = new Product({title,imgUrl,description,price,userId})
	product.save()
	.then(res.redirect('/admin/products'))
	.catch(err=>console.log(err))
	
}

exports.getEditProduct = (req, res, next)=>{
	let productId= req.params.id
	let editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/')
	}
	Product.findById(productId)
	.then(product=>{
		if(!product) return res.redirect('/')
		let data ={
				pageTitle:'Edit product',
			 	path: 'admin/edit-product',
			 	editMode,
			 	product:product,
				isAuth:req.isLoggedIn

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
	Product.findById(productId)
	.then(product=>{
		product.title = title
		product.imgUrl = imgUrl
		product.description = description
		product.price = price
		return product.save()
	})
	.then((result)=>{
		// console.log(result)
		console.log("Updated")
		res.redirect('/admin/products')
	})
	.catch(err=>console.log(err))
}

exports.getProducts = (req,res,next)=>{
	Product.find()
	.then((prod)=> {
		let data = {
		products:prod,
		pageTitle:'Admin Products',
		path : 'admin/products',
		isAuth:req.isLoggedIn

	}
	res.render('admin/products',data)
	})
	.catch(err=>console.log(err))
}

exports.postDeleteProduct = (req, res, next)=>{
	const id = req.body.productId
	Product.findByIdAndRemove(id)
	.then((result)=>{
		// console.log(result);
		res.redirect('/admin/products')
	})
	.catch(err=>console.log(err))
}
