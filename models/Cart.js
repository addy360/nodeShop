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


	static deleteFromCart(id,price){
		fs.readFile(p,(err,data)=>{
			if (err) {
				return
			}
			const cart = JSON.parse(data)
			const updatedCart={...cart}
			const product = updatedCart.products.find(p=>p.id===id)
			if (!product) return
			const productQty = product.qty
			updatedCart.products = updatedCart.products.filter(p=>p.id !== id)
			updatedCart.priceTotal = updatedCart.priceTotal - (price*productQty)
			fs.writeFile(p,JSON.stringify(updatedCart),err=>console.log(err))
		})
	}

	static getAllCartProducts(callback){
		fs.readFile(p,(err,data)=>{
			if (err) callback({
				products: [],
				priceTotal: 0
			})
			callback(JSON.parse(data))	
		})
	}

}