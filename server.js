const express = require('express')
const app = express()
const blogRoute = require('./routes/blog')
const methodOverride = require('method-override')
require('./db/db')
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.set('view engine' , 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req,res)=>{
	res.send('hello')
})


app.use('/blog', blogRoute)

const port = 3000;
app.listen(3000, ()=> console.log(`app running on ${port}`))