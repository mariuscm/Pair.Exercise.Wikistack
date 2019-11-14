const express = require('express')
const router = express.Router()
const { db, Page, User } = require('../models');
const {wikiPage, addPage, main} = require('../views')

module.exports = router;

router.get('/', async (req, res, next) => {
  const data = await Page.findAll()
  const pagesArr = data.map(elem => elem.dataValues);
  res.send(main(pagesArr))
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
    res.redirect(`/wiki/${newPage.slug}`);
  } catch (error) {
    next(error)
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    console.log(req.body)
    res.send(wikiPage(page, req.body.name))
  } catch(error) {
    next(error)
  }
})
