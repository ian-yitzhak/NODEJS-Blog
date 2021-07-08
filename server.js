const express = require('express')
const app = express()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/login')

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


app.get('/', (req,res)=>{
	res.send('hello')
})


app.use('/blog', blogRoute)
app.use('/admin', authRoute)

const port = 3000;
app.listen(3000, ()=> console.log(`app running on ${port}`))