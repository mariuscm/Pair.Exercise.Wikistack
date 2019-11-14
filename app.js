const express = require('express')
const morgan = require('morgan')
const views = require('./views')
const wikiRouter = require('./routes/wiki.js')
const userRouter = require('./routes/user.js')
const app = express()
const { db, Page, User } = require('./models')

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.redirect('/wiki')
})

const init = async () => {
  await db.sync({ force: false })

  app.listen(3000, () => {
    console.log('Running on port 3000')
  })
}

init()

db.authenticate().then(() => {
  console.log('connected to the database')
})
