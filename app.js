const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

// MODELS
const User = require('./models/User')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))



app.use((req,res,next)=>{
	User.findById('5e2f6043b7ca8b075c0855df')
	.then(user=>{
		req.user=user
		next()
		})
	.catch(err=>{
		console.log(err)
		next()
	})
})
app.use(bodyparser.urlencoded({extended:false}))

app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req,res,next)=>res.render('404',{pageTitle:'Page Not Found',path:''}))


mongoose.connect('mongodb://addyNode:addyNode1111@nodeapp-shard-00-00-tpzfw.mongodb.net:27017,nodeapp-shard-00-01-tpzfw.mongodb.net:27017,nodeapp-shard-00-02-tpzfw.mongodb.net:27017/shop?ssl=true&replicaSet=nodeApp-shard-0&authSource=admin&retryWrites=true&w=majority')
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
