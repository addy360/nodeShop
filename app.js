const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')

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

const csrfProtection = csrf()

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
app.use(csrfProtection)
app.use(flash())
// asigning global variables to all the views
app.use((req,res,next)=>{
	res.locals.csrfToken=req.csrfToken()
	next()
})

app.use('/auth',authRoutes)
app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req,res,next)=>res.render('404',{pageTitle:'Page Not Found',path:'',isAuth:req.isLoggedIn}))


mongoose.connect(MONGO_URI)
.then(results=>{
	// console.log(results);
		app.listen(3000,()=>console.log('Server is started'))
})
.catch(err=>console.log(err))
