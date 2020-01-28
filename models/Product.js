const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
	title:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	imgUrl:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	userId: {
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	}
})

module.exports = mongoose.model('Product',productSchema)



// const getDb = require('../util/database').getDb
// const ObjectId = require('mongodb').ObjectID;

// class Product{
// 	constructor(title, price,imgUrl,description,id,userId){
// 		this.title = title
// 		this.price = price
// 		this.imgUrl = imgUrl
// 		this.description= description
// 		this._id = id
// 		this.userId= userId
// 	}

// 	save(){
// 		const db = getDb()
// 		let dbop = null
// 		if (this._id) {
// 			// update the product
// 			dbop = db.collection('products').updateOne({'_id':new ObjectId(this._id)},{$set:this})
// 		} else {
// 			dbop = db.collection('products').insertOne(this)
// 		}
// 		return dbop
// 		.then(result=>console.log("Data inserted"))
// 		.catch(err=>console.log(err))
// 	}

// 	static fetchAll(){
// 		const db = getDb()
// 		return db.collection('products').find().toArray()
// 		.then(result=>{
// 			// console.log(result)
// 			return result
// 		})
// 		.catch(err=>console.log(err))
// 	}

// 	static findById(id){
// 		const db = getDb()
// 		return db.collection('products').find({'_id':new ObjectId(id)}).next()
// 		.then(result=>{
// 			console.log(result)
// 			if (result) {
// 				return result

// 			} else {
// 				throw "Wrong query"
// 			}
// 		})
// 	}

// 	static deleteById(id){
// 		const db = getDb()
// 		return db.collection('products').deleteOne({'_id':new ObjectId(id)})
// 		.then(data=>{
// 			console.log('item deleted')
// 		})
// 		.catch(err=>console.log(err))
// 	}
// }



// module.exports = Product