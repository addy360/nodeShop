const db = require('../util/database')
const Cart = require('./Cart')


module.exports = class Product{
	constructor(id,title,imgUrl, description, price){
		this.id=id;
		this.title = title,
		this.description=description,
		this.imgUrl=imgUrl,
		this.price=price
	}

	save(){
		return db.execute('INSERT INTO products VALUES (?,?,?,?,?)',[null,this.title,this.imgUrl,this.description,this.price])
	}

	static fetchAll(){
		return db.execute('SELECT * FROM products')
	}

	static fetchOneById(id){
		return db.execute('SELECT * FROM products WHERE id = ?',[id])

	}

	static deleteById(id){
		

	}
}

