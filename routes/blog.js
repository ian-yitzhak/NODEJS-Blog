const express = require('express')
const router = express.Router()

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


module.exports = router