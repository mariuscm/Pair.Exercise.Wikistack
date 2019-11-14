const express = require('express')
const router = express.Router()
const { db, Page, User } = require('../models');
const {wikiPage, addPage} = require('../views')

module.exports = router;

router.get('/', async (req, res, next) => {
  const data = await Page.findAll()
  console.log(data);
  res.send('wikipage')
})

router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title;
    const slug = title;
    const content = req.body.content;
    const status = req.body.status;

    console.log("TCL: req.body", req.body)

    const newPage = await Page.create({
      title,
      slug,
      content,
      status
    })
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})
