const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const conn = require('./util/database').mongoConnect

// MODELS
const User = require('./models/User')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))

//inserting demo user
// app.use((req,res,next)=>{
// 	let user = new User('addy','adil@ad.com')
// 	user.save()
// 	.then(()=>next())
// 	.catch(()=>{
// 		console.log('failed to insert')
// 		next()
// 	})
// })

app.use((req,res,next)=>{
	User.findById('5e2eb99ba20fc710d47060b6')
	.then(user=>{
		req.user=new User(user.username,user.email,user.cart,user._id)
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

conn(()=>{
	app.listen(3000,(server)=>console.log('\nApp started\n'+server))
})

