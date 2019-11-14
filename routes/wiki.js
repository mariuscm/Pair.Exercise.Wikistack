const express = require('express')
const router = express.Router()
const { db, Page, User } = require('../models');
const {wikiPage} = require('../views')

module.exports = router;

router.get('/', async (req, res, next) => {
  const data = await Page.findAll()
  console.log(data);
  res.send(wikiPage())
})

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const slug = req.body.slug;
  const content = req.body.content;
  const status = req.body.status;
  const newPage = await Page.create({
    title,
    slug,
    content,
    status
  })
  res.sendStatus(204).send()
})
