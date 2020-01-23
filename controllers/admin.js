const Product = require('../models/Product')

exports.getAddProduct = (req, res, next)=>{
	
	res.render('admin/edit-product',{pageTitle:'Add product', path: 'admin/add-product',editMode:false})
}

exports.postAddProduct=(req,res,next)=>{
	const title = req.body.title
	const imgUrl = req.body.imgUrl
	const description = req.body.description
	const price = req.body.price
	Product.create({
		title,
		price,
		imgUrl,
		description,
		userId:req.user.id
	})
	.then(res.redirect('/'))
	.catch(err=>console.log(err))
	
}

exports.getEditProduct = (req, res, next)=>{
	let productId= req.params.id
	let editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/')
	}
	req.user.getProducts({where:{id:productId}})
	.then(product=>{
		if(!product) return res.redirect('/')
		let data ={
				pageTitle:'Edit product',
			 	path: 'admin/edit-product',
			 	editMode,
			 	product:product[0]
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
	Product.findAll({where:{id:productId}})
	.then(product=>{
		product[0].title = title
		product[0].imgUrl = imgUrl
		product[0].price = price
		product[0].description = description
		return product[0].save()
	})
	.then(data=>{
		res.redirect('/admin/products')
	})
	.catch(err=>console.log(err))
}

exports.getProducts = (req,res,next)=>{
	req.user.getProducts()
	.then((prod)=> {
		let data = {
		products:prod,
		pageTitle:'Admin Products',
		path : 'admin/products'
	}
	res.render('admin/products',data)
	})
	.catch(err=>console.log(err))
}

exports.postDeleteProduct = (req, res, next)=>{
	const id = req.body.productId
	Product.destroy({where:{id:id}})
	.then(data=>{
		res.redirect('/admin/products')
	})
	.catch(err=>console.log(err))
}
