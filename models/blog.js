const mongoose = require('mongoose')
const marked = require('marked')

const slugify = require('slugify')
const blogSchema = new mongoose.Schema({

	title:{
		type: String,
		required: true
	},
	description :{
		type:String,
		required: true
	},
	markdown:{
		type:String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	},
	slug:{
		type: String,
		required: true,
		unique: true
	}
	
})

blogSchema.pre('validate', function(next){
	if(this.title){
		this.slug = slugify(this.title , {
			lower: true,
			strict : true
		})
	}
	next()
})

module.exports = mongoose.model('Blog' , blogSchema)