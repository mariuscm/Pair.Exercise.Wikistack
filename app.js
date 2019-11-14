const express = require('express')
const morgan = require('morgan')
const views = require('./views')
const app = express()

app.use(express.static(__dirname + '/public'))

app.use(morgan('dev'))

app.get('/', (req, res, next)=>{
  res.send(views.main(''))
})
app.listen(3000, () => {
  console.log('Running on port 3000')
})
