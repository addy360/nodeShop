const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename), 'data','carts.json')

module.exports = class Cart{

	static addToCart(id,price){
		fs.readFile(p,(err,data)=>{
			let cart = {
				products: [],
				priceTotal: 0
			}
			if (!err) {
				cart = JSON.parse(data)
			}
			let currentProductIndex = cart.products.findIndex(p=> p.id===id)
			let currentProduct = cart.products[currentProductIndex]
			let updatedProduct=null
			if (currentProduct) {
				updatedProduct = {...currentProduct}
				updatedProduct.qty = updatedProduct.qty+1
				cart.products = [...cart.products]
				cart.products[currentProductIndex]= updatedProduct
			}else{
				updatedProduct = {id:id,qty:1}
				cart.products = [...cart.products, updatedProduct]
			}

			cart.priceTotal = +cart.priceTotal + +price
			fs.writeFile(p,JSON.stringify(cart),err=>console.log(err))
		})
	}

}