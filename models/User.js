const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	cart:{
		items:[{productId:{type:Schema.Types.ObjectId,ref:'Product',required:true},qty:{type:Number,required:true}}]
	}
})

userSchema.methods.addToCart = function(product){
		const cartProductIndex = this.cart.items.findIndex(cp=>{
			return cp.productId.toString() === product._id.toString()
		})
		let newQty = 1
		const updatedCartItems = [...this.cart.items]
		if (cartProductIndex>=0) {
			let newQty = this.cart.items[cartProductIndex].qty +1
			updatedCartItems[cartProductIndex].qty = newQty
		} else {
			updatedCartItems.push({productId:product._id, qty:newQty})
		}

		const updatedCart = { items:updatedCartItems}
		this.cart = updatedCart
		return this.save()
}

userSchema.methods.deleteItemCart = function(id){
		const updatedCartItems = this.cart.items.filter((item)=>{
			return item.productId.toString() !== id.toString()
		})
		this.cart.items = updatedCartItems
		return this.save()
}

userSchema.methods.clearCart = function(){
	this.cart = {items:[]}
	return this.save()
}


module.exports = mongoose.model('User',userSchema)

// const getDb = require('../util/database').getDb
// const ObjectId = require('mongodb').ObjectID;


// class User {
// 	constructor(username,email,cart, id){
// 		this.username = username
// 		this.email = email
// 		this.cart = cart // {items:[]}
// 		this._id = id
// 	}

// 	save(){
// 		const db = getDb()
// 		return db.collection('users').insertOne(this)
// 		.then(data=>{
// 			// console.log(data)
// 			console.log('user inserted')
// 		})
// 		.catch(err=>console.log(err))

// 	}

// 	addToCart(product){
// 		console.log(product)
// 		const cartProductIndex = this.cart.items.findIndex(cp=>{
// 			return cp.productId.toString() === product._id.toString()
// 		})
// 		let newQty = 1
// 		const updatedCartItems = [...this.cart.items]
// 		if (cartProductIndex>=0) {
// 			let newQty = this.cart.items[cartProductIndex].qty +1
// 			updatedCartItems[cartProductIndex].qty = newQty
// 		} else {
// 			updatedCartItems.push({productId:new ObjectId(product._id), qty:newQty})
// 		}

// 		const updatedCart = { items:updatedCartItems}
// 		const db = getDb()
// 		return db.collection('users').updateOne({'_id':new ObjectId(this._id)},{$set:{cart:updatedCart}})
// 	}

// 	static findById(id){
// 		const db = getDb()
// 		return db.collection('users').find({'_id': new ObjectId(id)}).next()
// 		.then(user=>{
// 			// console.log(user)
// 			return user
// 		})
// 		.catch(err=>console.log(err))
// 	}

// 	getCart(){
// 		const productIds = this.cart.items.map(item=>{
// 			return item.productId
// 		})
// 		// console.log(productIds)
// 		const db = getDb()
// 		return db.collection('products').find({_id:{$in:[...productIds]}}).toArray()
// 		.then(products=>{
// 			// console.log(products)
// 			return products.map(product=>{
// 				return {...product,qty:this.cart.items.find(item=>{
// 					return item.productId.toString() === product._id.toString()
// 				}).qty}
// 			})
// 		})
// 		.catch(err=>console.log(err))
// 	}

// 	addOrder(){
// 		const db = getDb()
// 		return this.getCart()
// 		.then(products=>{
// 			const order ={
// 				items:products,
// 				user:{
// 					_id:new ObjectId(this._id),
// 					name:this.username
// 				}
// 			}
// 			return db.collection('orders').insertOne(order)
// 		})
// 		.then(result=>{
// 			this.cart = {items:[]}
// 			return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}})
// 		})
// 	}

// 	getOrders(){
// 		const db = getDb()
// 		return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray()
// 	}

// 	deleteItemCart(id){
// 		const updatedCartItems = this.cart.items.filter((item)=>{
// 			return item.productId.toString() !== id.toString()
// 		})
// 		const db = getDb()
// 		return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}})
// 	}
// }

// module.exports = User