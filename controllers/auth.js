const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.login=(req,res,next)=>{
	// const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1]
	let message = null
	message = req.flash('error')
	let data ={
				pageTitle:'Login',
			 	path: '/auth/login',
			 	isAuth:false,
			 	message
			}
			console.log(req.session)
	res.render('auth/login',data)
}

exports.postLogin=(req,res,next)=>{
		const email = req.body.email
		const password = req.body.Password
		let user = null
		User.findOne({email:email})
		.then(userResult=>{
			user = userResult
			if(!userResult){
				req.flash('error','Invalid Email or Password.')
				return res.redirect('/auth/login')

			} 
			bcrypt.compare(password,user.password)
		.then(result=>{
			if (result) {
				req.session.isLoggedIn=true
				req.session.user = user
				return req.session.save(err=>{
					console.log(err)
					return res.redirect('/')
				})
			}else{
				req.flash('error','Invalid Email or Password.')
				res.redirect('/auth/login')
			}
		})
		})
		.catch(err=>console.log(err))
}

exports.postLogout=(req,res,next)=>{
	req.session.destroy((err)=>{
		console.log(err)
		res.redirect('/')
	})
}

exports.signUp = (req,res,next)=>{
	let data ={
				pageTitle:'Sign Up',
			 	path: '/auth/signup',
			 	isAuth:false
			}
	res.render('auth/signup',data)
}
exports.postSignUp = (req,res,next)=>{
	const email = req.body.email
	const password = req.body.Password
	const password2 = req.body.Password2
	User.findOne({email:email})
	.then(result=>{
		if (result) {
			req.flash('error','E-mail already taken.')
			return res.redirect('/auth/signup')
		}

	// console.log(req.body)
		return bcrypt.hash(password,12)
		.then(hashedPwd=>{
		const user = new User({
			password:hashedPwd,
			email:email,
			cart:{items:[]}
		})
		return user.save()
		})
		.then(savedUser=>{
			// console.log(savedUser)
			return res.redirect('/auth/login')
		})
		
	})
	.catch(err=>console.log(err))
}