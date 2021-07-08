const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

const{  ensureAuthenticated } = require('./auth');

router.get('/new' , (req,res)=>{
	res.render('new', {blog : new Blog()})
})

router.get('/edit/:id' , async (req,res)=>{
	const blog = await Blog.findById(req.params.id)
	res.render('edit', {blog : blog })
})

router.get('/:slug', async (req,res)=>{
	const blog = await Blog.findOne({ slug: req.params.slug })
	if(blog == null){
		res.redirect('/')
	}

	res.render('show', {blog : blog})
})

router.post('/', ensureAuthenticated , async (req,res)=>{

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

router.put('/:id', ensureAuthenticated ,async (req,res)=>{

  req.blog = await Blog.findById(req.params.id);
  let blog = req.blog;
  blog.title = req.body.title;
  blog.markdown = req.body.markdown;
  blog.description= req.body.description

	try{

		blog = await blog.save()
		res.redirect(`/blog/${blog.slug }`)
	}catch(err){
		res.status(422).send(err)
	}
})


router.delete('/:id',ensureAuthenticated ,  async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.redirect('/blog')
})


module.exports = router