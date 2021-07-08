const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', (req,res)=>{

	const blog = [{
		title: 'test',
		date: new Date(),
		description: 'test descritpion'
	},
	{
		title: 'test 2',
		date: new Date(),
		description: 'test descritpion 2'
	}


	]
	res.render('index', {blog: blog})
})
router.post('/', (req,res)=>{


})

router.get('/new', (req,res)=>{
	res.render('new')
})


module.exports = router