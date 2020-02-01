const User = require('../models/User')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')

// initializng nodemailer
const transporter = nodemailer.createTransport(sendGridTransport({
	auth:{
		api_key:'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'
	}
})) 

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
	message = req.flash('error')

	let data ={
				pageTitle:'Sign Up',
			 	path: '/auth/signup',
			 	isAuth:false,
			 	message
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
			res.redirect('/auth/login')
			return transporter.sendMail({
						to: email,
  						from: 'node.shop@addy360.com',
 						subject: 'Sign up verified email',
  						text: `Helo dear ${email}`,
  						html: '<strong>Guess what, You have just been signed up with our online shop, congs!!</strong>',
					})
		})

		
	})
	.catch(err=>console.log(err))
}