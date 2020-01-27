const mongodb = require('mongodb')

const client = mongodb.MongoClient

let _db = null

const mongoConnect = (callback)=>{
	// client.connect('mongodb://addyNode:addyNode1111@nodeapp-shard-00-00-tpzfw.mongodb.net:27017,nodeapp-shard-00-01-tpzfw.mongodb.net:27017,nodeapp-shard-00-02-tpzfw.mongodb.net:27017/shop?ssl=true&replicaSet=nodeApp-shard-0&authSource=admin&retryWrites=true&w=majority')
	client.connect('mongodb://addyNode:addyNode1111@nodeapp-shard-00-00-tpzfw.mongodb.net:27017,nodeapp-shard-00-01-tpzfw.mongodb.net:27017,nodeapp-shard-00-02-tpzfw.mongodb.net:27017/shop?ssl=true&replicaSet=nodeApp-shard-0&authSource=admin&retryWrites=true&w=majority')
	// client.connect('mongodb+srv://addyNode:addyNode1111@nodeapp-tpzfw.mongodb.net/shop?retryWrites=true&w=majority')
	.then(result=>{
		console.log('database connected!!')
		_db = result.db()
		callback()
	})
	.catch(err=>{
		console.log(err)
	})
}

const getDb=()=>{
	if (_db) {
		return _db
	} else {
		throw "No database at the moment"
	}
}


exports.mongoConnect = mongoConnect
exports.getDb = getDb
