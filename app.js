const express = require('express')
const morgan = require('morgan')
const views = require('./views')
const app = express()
const { db, Page, User } = require('./models');



app.use(express.static(__dirname + '/public'))

app.use(morgan('dev'))

app.get('/', (req, res, next)=>{
  res.send(views.main(''))
})

const init = async () => {
  await db.sync({force: true});
  
  app.listen(3000, () => {
    console.log('Running on port 3000')
  })
}

init();

db.authenticate().
then(() => {
  console.log('connected to the database');
})