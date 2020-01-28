const User = require('../models/User')

exports.login=(req,res,next)=>{
	// const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1]
	let data ={
				pageTitle:'Login',
			 	path: '/auth/login',
			 	isAuth:false
			}
			console.log(req.session)
	res.render('auth/login',data)
}

exports.postLogin=(req,res,next)=>{
		req.session.isLoggedIn=true
		res.redirect('/')
}

exports.postLogout=(req,res,next)=>{
	req.session.destroy((err)=>{
		console.log(err)
		res.redirect('/')
	})
}