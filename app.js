const express = require('express')
const bodyparser = require('body-parser')
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const keys = require('./conf/keys')

// MODELS
const User = require('./models/User')

// rotes
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
// constants
const MONGO_URI = keys.mongoUri

// multer
const storage = multer.diskStorage({
  filename:  (req, file, cb)=> {
    cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
  },
  destination: (req, file, cb) =>{
      cb(null,'public/images')
  },
})

const fileFilter = (req,file,cb)=>{
	if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' ) {
		cb(null, true)
	}else{
		cb(null,false)
	}
}

const app = express()
const store = new MongoDBStore({
	uri:MONGO_URI,
	collection:"sessions"
})

const csrfProtection = csrf()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public',express.static(path.join(__dirname, 'public')))
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


app.use(multer({storage,fileFilter}).single('image'))

app.use(csrfProtection)
app.use(flash())
// asigning global variables to all the views
app.use((req,res,next)=>{
	res.locals.csrfToken=req.csrfToken()
	res.locals.success_msg=req.flash('success_msg')
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
