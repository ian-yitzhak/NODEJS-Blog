const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/new' , (req,res)=>{
	res.render('new', {blog : new Blog()})
})

router.get('/:slug', async (req,res)=>{
	const blog = await Blog.findOne({ slug: req.params.slug })
	if(blog == null){
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
		res.redirect(`/blog/${blog.slug }`)
	}catch(e){
		console.log(e)
	}


})


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

router.delete('/:id', async (req,res)=>{
	await Blog.findByIdAndDelete(req.params.id)
	res.redirect('/')
})


module.exports = router