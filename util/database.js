const Sequalize = require('sequelize')

const sequelize = new Sequalize('nodeapp','root','',{
	dialect:'mysql',
	host:'localhost'
})

module.exports = sequelize