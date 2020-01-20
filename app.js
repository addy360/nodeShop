const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyparser.urlencoded({extended:false}))

app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req,res,next)=>res.render('404',{pageTitle:'Page Not Found'}))



app.listen(3000)