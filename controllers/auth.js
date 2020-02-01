const crypto = require('crypto')

const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const User = require('../models/User')
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

exports.getReset = (req,res,next)=>{
	message = req.flash('error')
	let data ={
				pageTitle:'Reset password',
			 	path: '/auth/reset',
			 	isAuth:false,
			 	message
			}
	res.render('auth/passwordReset', data)		
}

exports.postReset = (req,res,next)=>{
	crypto.randomBytes(32,(err,buffer)=>{
		if (err) {
			console.log(err)
			return res.redirect('/reset')
		}
		const token = buffer.toString('hex')
		User.findOne({email:req.body.email})
		.then(user=>{
			if (!user) {
				req.flash('error', 'No user for this E-mail!!')
				return res.redirect('/auth/reset')
			}else{
				user.token = token
				user.tokenExp = Date.now() + 3600000 // plus an hour ahead
			    user.save()
			    .then(user=>{
				console.log(user)
				res.redirect('/')
				transporter.sendMail({
						to: req.body.email,
  						from: 'node.shop@addy360.com',
 						subject: 'Password reset',
  						text: `Helo dear ${req.body.email}`,
  						html: `
							<p>You requested a password reset from Our website</p>
							<p>Click to <a href="http://localhost:3000/auth/reset/${token}"> HERE </a> reset</p>
  						`,
					})

		})
		.catch(err=>{
			console.log(err)
	    })

			}
		})
		.catch(err=>console.log(err))
		console.log(token)
	})

}

exports.getToken = (req,res,next)=>{
	const token = req.params.token
	User.findOne({token,tokenExp:{$gt:Date.now()}})
	.then(user=>{
		if (user) {
			let data ={
				pageTitle:'New password',
			 	path: '/auth/newPassword',
			 	isAuth:false,
			 	message:[],
			 	userId:user._id.toString(),
			 	token:user.token
			}
	res.render('auth/newPassword',data)
		}
	})
	.catch(err=>console.log(err))
}

exports.postToken = (req,res,next)=>{
	// console.log(req.body)
	const {Password, _csrf, token, userId } = req.body
	let resetUser = null
	User.findOne({_id:userId, token:token, tokenExp:{$gt:Date.now()}})
	.then(user=>{
		// console.log(user)
		// if (!user) {
		// 	req.flash('error','Token has expired, Please try again!')
		// 	return res.redirect('/auth/reset')

		// }

		resetUser = user
		return bcrypt.hash(Password, 12) 
	})
	.then(hashedPwd=>{
		resetUser.password = hashedPwd
		resetUser.token = undefined
		resetUser.tokenExp = undefined
		return resetUser.save()
	})
	.then(savedUser=>{
		console.log(savedUser)
		req.flash('error','You can now Login with your new password!')
		res.redirect('/auth/login')
		console.log(req.flash())
	})
	.catch(err=>{
		console.log(err)
	})

}