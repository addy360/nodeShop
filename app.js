const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

// MODELS
const User = require('./models/User')

// rotes
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
// constants
const MONGO_URI = 'mongodb://addyNode:addyNode1111@nodeapp-shard-00-00-tpzfw.mongodb.net:27017,nodeapp-shard-00-01-tpzfw.mongodb.net:27017,nodeapp-shard-00-02-tpzfw.mongodb.net:27017/shop?ssl=true&replicaSet=nodeApp-shard-0&authSource=admin&retryWrites=true&w=majority'

const app = express()
const store = new MongoDBStore({
	uri:MONGO_URI,
	collection:"sessions"
})

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret:'any string',
	resave:false,
	saveUninitialized:false,
	store,
}))



app.use((req,res,next)=>{
	if (!req.session.user){
		return next()
	} 

	User.findById(req.session.user._id)
	.then(user=>{
		req.user=user
		// req.session.user=user
		// req.session.isLoggedIn=true
		next()
		})
	.catch(err=>{
		console.log(err)
		next()
	})
})
app.use(bodyparser.urlencoded({extended:false}))

app.use('/auth',authRoutes)
app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req,res,next)=>res.render('404',{pageTitle:'Page Not Found',path:'',isAuth:req.isLoggedIn}))


mongoose.connect(MONGO_URI)
.then(result=>{
	return User.findOne()
})
.then(user=>{
	if (!user) {	
		const user = new User({
			username:'Addy',
			email:'Addy@ad.com',
			cart: {
				items:[]
			}
		})
		return user.save()
	}
})
.then(user=>{
	console.log(user);
		app.listen(3000,()=>console.log('Server is started'))
})
.catch(err=>console.log(err))
