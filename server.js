const express = require('express')
const app = express()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/login')
const Blog = require('./models/blog')

const methodOverride = require('method-override')

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


require('./db/db')
require('./routes/passport')(passport)

app.set('view engine' , 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static('public'))

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))


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


app.use('/blog', blogRoute)
app.use('/admin', authRoute)

const port =process.env.PORT || 3000;
app.listen(port, ()=> console.log(`app running on ${port}`))