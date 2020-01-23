const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const sequelize = require('./util/database')

// MODELS
const Product = require('./models/Product')
const User = require('./models/User')
const Cart = require('./models/Cart')
const CartItem = require('./models/Cart-Item')
const Order = require('./models/Order')
const OrderItem = require('./models/Order-Item')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))
app.use((req,res,next)=>{
	User.findAll({where:{id:1}})
	.then(user=>{
		req.user=user[0]
		// req.user.createCart()
		// .then(data=>{
		// 	console.log(data)
		// 	next()
		// })
			next()
		
	})
	.catch(err=>console.log(err))
})
app.use(bodyparser.urlencoded({extended:false}))

app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req,res,next)=>res.render('404',{pageTitle:'Page Not Found',path:''}))

// relationships
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product , {through:CartItem})
Product.belongsToMany(Cart, {through:CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{through:OrderItem})
sequelize.sync()
// sequelize.sync({force:true})
.then(data=>{
	app.listen(3000)
})
.catch(err=>console.log(err))

