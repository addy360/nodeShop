const Product = require('../models/Product')
module.exports=(req,res,next)=>{
	Product.findOne({userId:req.user._id})
	.then(product=>{
		if(product){
			// console.log(product)
			console.log(req.user)
		}else{
			return res.redirect('/admin/products')
			
		}
		next()
	})
}