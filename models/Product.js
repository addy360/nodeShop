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
	constructor(title,imgUrl, description, price){
		this.title = title,
		this.description=description,
		this.imgUrl=imgUrl,
		this.price=price
	}

	save(){
		getData(data=>{
			data.push(this)
			fs.writeFile(p,JSON.stringify(data), (err)=>console.log(err))
		})
	}

	static fetchAll(callback){
		getData(callback)
	}
}