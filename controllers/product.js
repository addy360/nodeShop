const Product = require('../models/Product')

exports.getAddProduct = (req, res, next)=>{
	
	res.render('add-product',{pageTitle:'Add product', path: 'admin/add-product'})
}

exports.postAddProduct=(req,res,next)=>{
	let product = new Product(req.body.title)
	product.save()
	res.redirect('/')
}


exports.getProducts = (req, res, next)=>{
	let prods = []
	Product.fetchAll((prod)=> {
		let data = {
		products:prod,
		pageTitle:'Products',
		path : '/'
	}
	res.render('shop',data)
	})
	

}

