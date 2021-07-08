const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

	title:{
		type: String,
		required: true
	},
	description :{
		type:String
	},
	markdown:{
		type:String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}


	
})

module.exports = mongoose.model('Blog' , blogSchema)