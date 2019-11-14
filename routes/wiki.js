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
    const author = await User.findOrCreate({ where: {
      name: req.body.name,
      email: req.body.email
    }})
    console.log("TCL: req.body", req.body)
    // console.log("TCL: req.body", req.body)

    const newPage = await Page.create({
      title,
      slug,
      content,
      status
    })
    // console.log(Object.keys(newPage.__proto__));
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
    const author = await page.setAuthor()
    console.log("TCL: author", author)

    console.log(req.body)
    res.send(wikiPage(page, author.name))
  } catch(error) {
    next(error)
  }
})
