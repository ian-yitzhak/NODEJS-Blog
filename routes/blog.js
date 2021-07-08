const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', async  (req,res)=>{

	try{
		const blog = await Blog.find({}).sort({
			date: 'desc'
		})

		res.render('index' , {blog: blog})
	}catch(e){
		console.log(e)
	}
})

router.get('/:id', async (req,res)=>{
	const blog = await Blog.findById(req.params.id)
	if(!blog){
		res.redirect('/')
	}

	res.render('show', {blog : blog})

})


router.post('/', async (req,res)=>{

	const blog = new Blog({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown
	})
	try{
		saveBlog = await blog.save()
		res.redirect(`/blog/${blog.id}`)
	}catch(e){
		console.log(e)
	}


})






module.exports = router