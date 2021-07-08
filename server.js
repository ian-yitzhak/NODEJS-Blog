const express = require('express')
const app = express()
const blogRoute = require('./routes/blog')

require('./db/db')
app.use(express.json());
app.set('view engine' , 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req,res)=>{
	res.send('hello')
})


app.use('/blog', blogRoute)

const port = 3000;
app.listen(3000, ()=> console.log(`app running on ${port}`))