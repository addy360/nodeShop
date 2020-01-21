const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json')
function getData(cb){
		fs.readFile(p,(err,data)=>{
			if (err) {
				cb([])
			}else{
			 cb(JSON.parse(data))
			}
		})
}

module.exports = class Product{
	constructor(id,title,imgUrl, description, price){
		this.id=id;
		this.title = title,
		this.description=description,
		this.imgUrl=imgUrl,
		this.price=price
	}

	save(){
		getData(data=>{
			if (this.id) {
				const productIndex = data.findIndex(p=>p.id===this.id)
				const updatedProdArray = [...data]
				updatedProdArray[productIndex] = this
				fs.writeFile(p,JSON.stringify(updatedProdArray), (err)=>console.log(err))	
			}else{

				this.id = Math.random().toString()
				data.push(this)
				fs.writeFile(p,JSON.stringify(data), (err)=>console.log(err))
			}
		})
	}

	static fetchAll(callback){
		getData(callback)
	}

	static fetchOneById(id,callback){
		let product = null
		getData(data=>{
			product = data.find(p=>p.id===id)
			callback(product)
		})


	}
}